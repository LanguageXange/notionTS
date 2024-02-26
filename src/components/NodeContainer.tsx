import { NodeData } from "../utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NodeSwitcher } from "./NodeSwitcher";

type NodeContainerProps = {
  node: NodeData;
  updateFocusedIndex: (id: number) => void;
  isFocused: boolean;
  index: number;
};

export const NodeContainer = ({ node, ...props }: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex relative"
    >
      <div
        {...listeners}
        className="text-xl absolute p-2 -top-1 -left-2 cursor-grab font-bold opacity-10 hover:opacity-100 transition-opacity"
      >
        ⁙
      </div>

      <NodeSwitcher node={node} {...props} />
    </div>
  );
};
