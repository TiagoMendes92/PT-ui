import type { HighlightTextProps } from "./types";

const HighlightText = ({ text, searchTerm }: HighlightTextProps) => {
  if (!searchTerm.trim()) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: "orange" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightText;
