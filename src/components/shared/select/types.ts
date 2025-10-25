import type { CSSProperties } from "styled-components";

export type SelectOption = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

export type SelectButtonProps = {
  hasError?: boolean;
};

export type SelectArrowType = {
  isOpen?: boolean;
};

export type SelectDropdownProps = {
  isOpen?: boolean;
  top?: number;
  left?: number;
  width?: number;
};

export type OptionProps = { isSelected?: boolean };
