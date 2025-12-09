import { StyledLoader } from "./Loader.styles";
import type { LoaderProps } from "./types";

const Loader = ({
  size = 40,
  color = "#0047f9",
  thickness = 4,
}: LoaderProps) => (
  <StyledLoader size={size} color={color} thickness={thickness} />
);

export default Loader;
