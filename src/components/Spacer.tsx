type SpacerProps = {
  handleClick: () => void;
  showHint: boolean;
};

export const Spacer = ({ handleClick, showHint }: SpacerProps) => {
  return (
    <div
      className="text-slate-400 hover:text-slate-900 cursor-pointer text-left"
      onClick={handleClick}
    >
      {showHint && "Click to create the first paragraph!"}
    </div>
  );
};
