import { useState } from "react";
import { NodeData } from "../utils/types";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { BasicNode } from "../Node/BasicNode";
import { nanoid } from "nanoid";

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState("Default Title");
  const [focusId, setFocusId] = useFocusedNodeIndex({ nodes });
  const addNode = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node); // adding new node after the given index
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <div>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />

        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusId === index}
            updateFocusedIndex={setFocusId}
            index={index}
            addNode={addNode}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}

        <Spacer
          showHint={!nodes.length}
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
        />
      </div>
    </div>
  );
};
