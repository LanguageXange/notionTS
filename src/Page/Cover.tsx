import { ChangeEventHandler, useRef } from "react";

export const Cover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onImageUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target?.files?.[0]); // File object name, size, type...
  };
  return (
    <div className="flex-col">
      <img
        className="mx-auto my-6 rounded-lg"
        src="https://placehold.co/600x400"
        alt="cover image"
      />
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
