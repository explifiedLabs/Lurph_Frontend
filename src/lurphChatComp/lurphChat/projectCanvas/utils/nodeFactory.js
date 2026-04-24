import { NODE_INDEX } from "./nodePalette";

export function createNode(id, position, typeId) {
  const definition = NODE_INDEX[typeId];
  if (!definition) return null;

  return {
    id,
    type: "lurph",
    position,
    data: {
      typeId,
      label: definition.label,
      Icon: definition.Icon,
      color: definition.color,
      config: definition.fields.reduce((acc, field) => {
        acc[field.key] = "";
        return acc;
      }, {}),
    },
  };
}
