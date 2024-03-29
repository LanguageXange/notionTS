import { ChangeEventHandler, useRef } from "react";
import { FileImage } from "./FileImage";
import { handleImageUpload } from "../utils/misc";

type CoverProps = {
  filePath?: string;
  changePageCover: (filePath: string) => void;
};
export const Cover = ({ filePath, changePageCover }: CoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onImageUpload: ChangeEventHandler<HTMLInputElement> = async(e) => {
    // console.log(e.target?.files?.[0]); // File object name, size, type...
    const result = await handleImageUpload(e.target?.files?.[0]);
    if(result?.filePath){
      changePageCover(result?.filePath)
    }
  };
  return (
    <div className="flex-col">
      {filePath ? (
        <FileImage filePath={filePath} alt="cover image" />
      ) : (
        <img
          className="mx-auto my-6 rounded-lg"
          src="https://placehold.co/800x400"
          alt="cover image"
        />
      )}

      <button
        className="bg-slate-700 px-4 py-2 rounded-full text-white mx-auto block"
        onClick={handleClick}
      >
        Update Image
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        style={{ display: "none" }}
        onChange={onImageUpload} // user upload image
      />
    </div>
  );
};
