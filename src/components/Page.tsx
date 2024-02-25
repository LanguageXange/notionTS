import { useFocusedNodeIndex } from "../hooks/useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { BasicNode } from "./BasicNode";
import { nanoid } from "nanoid";
import { useAppState } from "../context/AppStateProvider";

export const Page = () => {
  const { addNode, setTitle, title, nodes } = useAppState();
  const [focusId, setFocusId] = useFocusedNodeIndex({ nodes });

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
