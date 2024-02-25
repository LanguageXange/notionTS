import { useEffect, useRef } from "react";
import { NodeData } from "../utils/types";
import { nanoid } from "nanoid";

type TitleProps = {
  title: string;
  changePageTitle: (title: string) => void;
  addNode: (node: NodeData, index: number) => void; // press enter
};

export const Title = ({ title, changePageTitle, addNode }: TitleProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);
  return (
    <div className="container mx-auto px-4">
      <h1
        ref={headerRef}
        contentEditable
        suppressContentEditableWarning
        className="text-5xl my-8 outline-none border border-slate-500"
        onInput={(e) => changePageTitle(e.currentTarget.textContent || "")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addNode({ type: "text", id: nanoid(), value: "" }, 0);
          }
        }}
      />
    </div>
  );
};
