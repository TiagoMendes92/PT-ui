import { useEffect, useRef, useState } from "react";
import type { CustomSelectProps } from "./types";
import {
  Arrow,
  Dropdown,
  EmptyOption,
  Placeholder,
  SelectButton,
  SelectContainer,
  SelectedValue,
  Option,
} from "./Select.styles";
import { createPortal } from "react-dom";

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  hasError = false,
  disabled = false,
  style = {},
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // Add this

  const selectedOption = options.find((opt) => opt.value === value);

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener("scroll", updateDropdownPosition, true);
      window.addEventListener("resize", updateDropdownPosition);
    }

    return () => {
      window.removeEventListener("scroll", updateDropdownPosition, true);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is outside both the container AND the dropdown
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    console.log("optionValue", optionValue);
    onChange(optionValue);
    setIsOpen(false);
  };

  const dropdown = (
    <Dropdown
      ref={dropdownRef} // Add ref here
      isOpen={isOpen}
      top={dropdownPosition.top}
      left={dropdownPosition.left}
      width={dropdownPosition.width}
    >
      <EmptyOption onClick={() => handleSelect("")}>Nenhuma</EmptyOption>
      {options.map((option) => (
        <Option
          className="montserrat"
          key={option.value}
          isSelected={option.value === value}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </Option>
      ))}
    </Dropdown>
  );

  return (
    <SelectContainer ref={containerRef} className="montserrat">
      <SelectButton
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        hasError={hasError}
        disabled={disabled}
        style={style}
      >
        {selectedOption ? (
          <SelectedValue className="montserrat">
            {selectedOption.label}
          </SelectedValue>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
        <Arrow isOpen={isOpen}>▼</Arrow>
      </SelectButton>

      {isOpen && createPortal(dropdown, document.body)}
    </SelectContainer>
  );
};

export default Select;
