import { NodeData } from "../utils/types";
import { useEffect, ChangeEvent, useRef } from "react";
import { useAppState } from "../context/AppStateProvider";
import { FileImage } from "./FileImage";
import { handleImageUpload } from "../utils/misc";

type ImageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};
export const ImageNode = ({ node, isFocused, index }: ImageNodeProps) => {
  const { removeNodeByIndex, changeNodeValue, changeNodeType } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!node.value || node.value.length === 0) {
      fileInputRef.current?.click(); // ask you to upload image twice - WHY ??
    }
  }, [node.value]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        removeNodeByIndex(index);
      }
      if (event.key === "Enter") {
        fileInputRef.current?.click();
      }
    };
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, removeNodeByIndex, index, node]);

  const onImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (!target.files) {
      changeNodeType(index, "text");
    }
    try {
      const result = await handleImageUpload(target.files?.[0]);
      if (result?.filePath) {
        changeNodeValue(index, result?.filePath);
      }
    } catch (error) {
      changeNodeType(index, "text");
    }
  };

  return (
    <div className="bg-orange-200 border-2 border-slate-600 w-20 h-20">
      <FileImage filePath={node.value} />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onImageUpload}
      />
    </div>
  );
};
