import type { VideoProps } from "./types";

const Video = ({ url }: VideoProps) => {
  const width = Math.min(window.innerWidth - 90, 560);
  const aspectRatio = 560 / 315; // ~1.778 (16:9)
  const height = Math.round(width / aspectRatio);

  return (
    <iframe
      style={{ marginBlock: "20px" }}
      width={width}
      height={height}
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Video;
