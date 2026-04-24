import {
  FiZap,
  FiLink,
  FiMail,
  FiFilter,
  FiCode,
  FiDatabase,
  FiFileText,
  FiGlobe,
  FiCpu,
  FiMessageCircle,
} from "react-icons/fi";

const Y = "#FFD600";

export const NODE_CATEGORIES = [
  {
    title: "Triggers",
    items: [
      {
        id: "trigger",
        label: "Trigger",
        Icon: FiZap,
        color: "#a78bfa",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Daily Trigger" },
          { key: "schedule", label: "Schedule", type: "text", placeholder: "Every day at 9:00 AM" },
        ],
      },
      {
        id: "webhook",
        label: "Webhook",
        Icon: FiLink,
        color: "#38bdf8",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Inbound Webhook" },
          { key: "url", label: "URL", type: "text", placeholder: "https://" },
        ],
      },
    ],
  },
  {
    title: "Core Nodes",
    items: [
      {
        id: "email",
        label: "Email",
        Icon: FiMail,
        color: "#f87171",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Send Email" },
          { key: "to", label: "To", type: "text", placeholder: "team@company.com" },
          { key: "subject", label: "Subject", type: "text", placeholder: "Status update" },
        ],
      },
      {
        id: "filter",
        label: "Filter",
        Icon: FiFilter,
        color: Y,
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Filter by status" },
          { key: "condition", label: "Condition", type: "text", placeholder: "status = active" },
        ],
      },
      {
        id: "code",
        label: "Code",
        Icon: FiCode,
        color: "#4ade80",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Transform Data" },
          { key: "script", label: "Script", type: "textarea", placeholder: "return items;" },
        ],
      },
      {
        id: "database",
        label: "Database",
        Icon: FiDatabase,
        color: "#60a5fa",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Postgres" },
          { key: "query", label: "Query", type: "textarea", placeholder: "SELECT * FROM" },
        ],
      },
    ],
  },
  {
    title: "AI + Data",
    items: [
      {
        id: "ai",
        label: "AI",
        Icon: FiCpu,
        color: "#e879f9",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Summarize" },
          { key: "prompt", label: "Prompt", type: "textarea", placeholder: "Summarize the content" },
        ],
      },
      {
        id: "http",
        label: "HTTP",
        Icon: FiGlobe,
        color: "#f97316",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Fetch API" },
          { key: "endpoint", label: "Endpoint", type: "text", placeholder: "https://api" },
        ],
      },
      {
        id: "notes",
        label: "Notes",
        Icon: FiFileText,
        color: "#22c55e",
        fields: [
          { key: "name", label: "Title", type: "text", placeholder: "Idea" },
          { key: "body", label: "Notes", type: "textarea", placeholder: "Write your note" },
        ],
      },
    ],
  },
  {
    title: "Collaboration",
    items: [
      {
        id: "chat",
        label: "Message",
        Icon: FiMessageCircle,
        color: "#818cf8",
        fields: [
          { key: "name", label: "Name", type: "text", placeholder: "Notify team" },
          { key: "channel", label: "Channel", type: "text", placeholder: "#ops" },
          { key: "message", label: "Message", type: "textarea", placeholder: "Workflow completed" },
        ],
      },
    ],
  },
];

export const NODE_INDEX = NODE_CATEGORIES.flatMap((c) => c.items).reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {}
);
