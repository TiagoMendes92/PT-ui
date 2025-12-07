import { StyledLoader } from "./Loader.styles";
import type { LoaderProps } from "./types";

const Loader = ({
  size = 40,
  color = "#007bff",
  thickness = 4,
}: LoaderProps) => (
  <StyledLoader size={size} color={color} thickness={thickness} />
);

export default Loader;
