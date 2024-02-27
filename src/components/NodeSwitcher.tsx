import { NodeData, NodeType } from "../utils/types";
import { BasicNode } from "./BasicNode";
import { PageNode } from "./PageNode";
import { ImageNode } from "./ImageNode";

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
  if (node.type == "page") {
    return <PageNode node={node} {...props} />;
  }
 
  if(node.type == 'image'){
    return <ImageNode node={node} {...props}/>
  }
  return null;
};
