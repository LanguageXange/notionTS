import { useFocusedNodeIndex } from "../hooks/useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";

import { nanoid } from "nanoid";
import { useAppState } from "../context/AppStateProvider";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NodeContainer } from "./NodeContainer";

export const Page = () => {
  const { addNode, setTitle, title, nodes, reorderNodes, cover, setCoverImage } = useAppState();
  const [focusId, setFocusId] = useFocusedNodeIndex({ nodes });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over?.id && over?.id !== active.id) {
      reorderNodes(active.id as string, over.id as string);
      const newID = over?.data?.current?.sortable.index;
      setFocusId(newID); // update Focus Id when dragging finished other it will focus on previous activeNode
    }
  };
  return (
    <div>
      <Cover filePath={cover} changePageCover={setCoverImage} />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />

        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext strategy={verticalListSortingStrategy} items={nodes}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                isFocused={focusId === index}
                updateFocusedIndex={setFocusId}
                index={index}
              />
            ))}
          </SortableContext>

          {/* <DragOverlay />  */}
        </DndContext>

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
