import { useState, useEffect } from "react";
import { NodeType } from "../utils/types";
import { useOverflowScreen } from "../hooks/useOverflowScreen";

type CommandProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportNodeType = {
  type: NodeType;
  name: string;
};

const supportedNodes: SupportNodeType[] = [
  { type: "text", name: "Text" },
  { type: "list", name: "List" },
  { type: "page", name: "Page" },
  { type: "image", name: "Image" },
  { type: "heading1", name: "Heading 1" },
  { type: "heading2", name: "Heading 2" },
  { type: "heading3", name: "Heading 3" },
];

// TO DO - handle arrow up and down to select node type - refactor useFocusedNodeIndex

// a list of slash command in the panel
export const Command = ({ nodeText, selectItem }: CommandProps) => {
  const [selectItemId, setSelectItemId] = useState(0);

  const { ref, isOverflow } = useOverflowScreen();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        selectItem(supportedNodes[selectItemId].type); // changeNodeType - function defined in BasicNode
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectItemId, selectItem]);

  // remember that nodeText is the node value ( what user types )
  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, "");
    setSelectItemId(
      supportedNodes.findIndex((node) => node.type.match(normalizedValue))
    );
  }, [nodeText]);

  return (
    <div ref={ref} className={`panel ${isOverflow ? "reverse" : ""}`}>
      <div className="title">Blocks</div>

      <ul>
        {supportedNodes.map((node, index) => {
          const selected = selectItemId === index;
          return (
            <li
              key={index}
              onClick={() => selectItem(node.type)}
              className={`${selected ? "selected" : ""}`}
            >
              {node.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
