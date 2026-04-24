import { useCallback, useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import CanvasHeader from "./components/CanvasHeader";
import NodePalette from "./components/NodePalette";
import NodeConfigModal from "./components/NodeConfigModal";
import LurphNode from "./nodes/LurphNode";
import { createNode } from "./utils/nodeFactory";

const Y = "#FFD600";

const INITIAL_NODES = [
  createNode("n1", { x: 120, y: 120 }, "trigger"),
  createNode("n2", { x: 360, y: 120 }, "filter"),
  createNode("n3", { x: 600, y: 120 }, "email"),
  createNode("n4", { x: 360, y: 260 }, "database"),
].filter(Boolean);

const INITIAL_EDGES = [
  { id: "e1-2", source: "n1", target: "n2", sourceHandle: "success", style: { stroke: Y, strokeWidth: 2 } },
  { id: "e2-3", source: "n2", target: "n3", sourceHandle: "success", style: { stroke: "#f87171", strokeWidth: 2 } },
  { id: "e2-4", source: "n2", target: "n4", sourceHandle: "error", style: { stroke: "#60a5fa", strokeWidth: 2 } },
];

function ProjectCanvasInner({ title }) {
  const { projectId } = useParams();
  const isNewWorkflow = projectId === "new";
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    isNewWorkflow ? [] : INITIAL_NODES
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    isNewWorkflow ? [] : INITIAL_EDGES
  );
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [modalNodeId, setModalNodeId] = useState(null);

  const nodeTypes = useMemo(() => ({ lurph: LurphNode }), []);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const stroke = sourceNode?.data?.color || Y;
      setEdges((eds) => addEdge({
        ...params,
        style: { stroke, strokeWidth: 2 },
      }, eds));
    },
    [nodes, setEdges]
  );

  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const typeId = event.dataTransfer.getData("application/reactflow");
      if (!typeId) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setNodes((nds) => {
        const nextId = `n${nds.length + 1}`;
        const next = createNode(nextId, position, typeId);
        return next ? nds.concat(next) : nds;
      });
    },
    [screenToFlowPosition, setNodes]
  );

  const handleNodeClick = useCallback((_, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleNodeDoubleClick = useCallback((_, node) => {
    setModalNodeId(node.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalNodeId(null);
  }, []);

  const handleSaveConfig = useCallback(
    (updatedConfig) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === modalNodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: updatedConfig.name || node.data.label,
                  config: { ...node.data.config, ...updatedConfig },
                },
              }
            : node
        )
      );
      setModalNodeId(null);
    },
    [modalNodeId, setNodes]
  );

  const handleDeleteNode = useCallback(
    (nodeId) => {
      if (!nodeId) return;
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      setModalNodeId(null);
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!selectedNodeId) return;
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        handleDeleteNode(selectedNodeId);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedNodeId, handleDeleteNode]);

  const selectedNode = nodes.find((node) => node.id === modalNodeId);

  return (
    <div className="flex-1 flex flex-col bg-[#050505]">
      <CanvasHeader
        title={title}
        hasSelection={Boolean(selectedNodeId)}
        onDeleteSelected={() => handleDeleteNode(selectedNodeId)}
      />

      <div className="flex flex-1 min-h-0">
        <NodePalette onDragStart={onDragStart} />

        <div className="flex-1 min-h-0 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,214,0,0.04), transparent)",
            }}
          />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            onNodeDoubleClick={handleNodeDoubleClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            connectionLineStyle={{ stroke: Y }}
            connectionLineType="straight"
            style={{ background: "rgba(8,8,8,0.95)", position: "relative", zIndex: 1 }}
          >
            <MiniMap
              nodeStrokeColor="#444"
              nodeColor="#111"
              maskColor="rgba(5,5,5,0.8)"
            />
            <Controls position="bottom-right" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={32}
              size={1.2}
              color="rgba(255,255,255,0.12)"
            />
          </ReactFlow>
        </div>
      </div>

      <NodeConfigModal
        node={selectedNode}
        onClose={handleCloseModal}
        onSave={handleSaveConfig}
        onDelete={handleDeleteNode}
      />
    </div>
  );
}

export default function ProjectCanvas() {
  const { projectId } = useParams();
  const isNewWorkflow = projectId === "new";
  const title = useMemo(
    () => (isNewWorkflow ? "New Workflow Canvas" : `Project ${projectId || ""} Canvas`),
    [projectId, isNewWorkflow]
  );

  return (
    <ReactFlowProvider>
      <ProjectCanvasInner key={projectId || "new"} title={title} />
    </ReactFlowProvider>
  );
}
