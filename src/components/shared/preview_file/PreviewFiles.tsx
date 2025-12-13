import { useEffect, useState } from "react";
import type { PeviewFileProps } from "./types";

const PreviewFile = ({
  file,
  width,
  height,
  fallbackSrc = "/img-placeholder.png",
}: PeviewFileProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(fallbackSrc);
      return;
    }

    if (typeof file === "string") {
      setPreview(file);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const isImage = file.type.startsWith("image/");
      setPreview(isImage ? (reader.result as string) : fallbackSrc);
    };

    reader.readAsDataURL(file);

    return () => {
      reader.abort();
    };
  }, [file, fallbackSrc]);

  return (
    <div className="preview-container" style={{ height: "100%" }}>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          width={width}
          height={height}
          className="preview"
        />
      )}
    </div>
  );
};

export default PreviewFile;
