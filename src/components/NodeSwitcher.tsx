import { NodeData, NodeType } from "../utils/types";
import { BasicNode } from "./BasicNode";

type NodeSwitcherProp = {
  node: NodeData;
  updateFocusedIndex: (id: number) => void;
  isFocused: boolean;
  index: number;
};

const textNodes: NodeType[] = [
  "text",
  "list",
  "heading1",
  "heading2",
  "heading3",
];

export const NodeSwitcher = ({ node, ...props }: NodeSwitcherProp) => {
  if (textNodes.includes(node.type)) {
    return <BasicNode node={node} {...props} />;
  }

  // to do later for handling image and page node type
  return null;
};
