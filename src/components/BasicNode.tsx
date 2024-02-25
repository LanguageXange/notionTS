import {
  useEffect,
  useRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { NodeData, NodeType } from "../utils/types";
import { nanoid } from "nanoid";
import { useAppState } from "../context/AppStateProvider";
import { Command } from "./Command";

// Page will have a list of nodes and need to remeber which one is focused
type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex: (id: number) => void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const showCommandPanel = isFocused && node.value.match(/^\//); // starts with a slash

  const { changeNodeValue, removeNodeByIndex, addNode, changeNodeType } =
    useAppState();

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      // meaning that we are not editting the value
      nodeRef.current.textContent = node.value;
    }
  }, [node, isFocused]);

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;

    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (e.key === "Enter") {
      e.preventDefault();
      //console.log(target.textContent, "e target textcontent");
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1); // add new ndoe and focus it
    }
    // delete node
    if (e.key === "Backspace") {
      //e.preventDefault();
      if (target.textContent?.length === 0) {
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1); // focus on previous node
      } else if (window.getSelection()?.anchorOffset === 0) {
        // cursor is at the beginning of the line
        e.preventDefault();
        updateFocusedIndex(index - 1);
        // move cursor to the end of the previous node
        const prevNode = target.parentNode?.previousSibling?.firstChild;
        if (prevNode) {
          const selection = window.getSelection();
          const range = document.createRange();
          //range.selectNodeContents(prevNode);
          range.setStart(prevNode, prevNode.childNodes.length);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }
  };

  function parseCommand(nodeType: NodeType) {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = ""; // to clear slash command otherwise we will see "/heading"
    }
  }

  return (
    <div
      className={`relative my-3 px-4 py-2 rounded-lg text-left ${
        isFocused ? `bg-slate-50` : ""
      }`}
    >
      <div
        ref={nodeRef}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`outline-none ${node.type}`}
        contentEditable
        suppressContentEditableWarning
      />

      {showCommandPanel && (
        <Command nodeText={node.value} selectItem={parseCommand} />
      )}

      {isFocused && !nodeRef?.current?.textContent && node.type === "text" && (
        <span className="absolute top-0 left-0 px-4 py-2 text-md text-slate-300 italic">
          Type Something Here ...
        </span>
      )}

      {isFocused && (
        <span className="absolute top-2 -left-3 text-sm text-slate-300">
          {index}
        </span>
      )}
    </div>
  );
};
