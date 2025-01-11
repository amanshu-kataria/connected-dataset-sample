import { Checkbox } from "@radix-ui/themes";
import { FC } from "react";

import "./checkbox.css";

interface CustomCheckboxProps {
  isChecked: boolean;
  variant?: "primary" | "secondary";
  onChange?: (value: boolean) => void;
}
export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isChecked,
  variant = "primary",
  onChange,
}) => {
  return (
    <Checkbox
      className={`custom-checkbox ${variant}-checkbox`}
      checked={isChecked}
      onCheckedChange={(val) => onChange?.(val as boolean)}
    />
  );
};
