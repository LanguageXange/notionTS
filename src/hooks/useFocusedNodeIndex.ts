import { SetStateAction, useState, Dispatch, useEffect } from "react";
import { NodeData } from "../utils/types";
type Props = {
  nodes: NodeData[];
};

// custom hook that updates focusIndex on arrow up and down
export const useFocusedNodeIndex = ({
  nodes,
}: Props): [number, Dispatch<SetStateAction<number>>] => {
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        // prevent index to be negative
        setFocusIndex((index) => Math.max(index - 1, 0));
      }
      if (e.key === "ArrowDown") {
        setFocusIndex((index) => Math.min(index + 1, nodes.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nodes]);

  return [focusIndex, setFocusIndex];
};
