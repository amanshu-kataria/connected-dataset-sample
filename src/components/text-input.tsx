import { Text, TextField } from "@radix-ui/themes";
import { CSSProperties, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputType = "text" | "email" | "password";

interface TextInputProps {
  label: string;
  type: InputType;
  inputProps: UseFormRegisterReturn;
  placeholder?: string;
  style?: CSSProperties;
  errorMessage?: string;
  size?: "small" | "medium" | "large";
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputStyle = {
  small: { height: "30px" },
  medium: { height: "38px" },
  large: { height: "44px" },
};

export const TextInput: FC<TextInputProps> = ({
  label,
  type,
  placeholder,
  inputProps,
  style,
  errorMessage,
  size = "large",
  icon,
  iconPosition = "left",
  onInputChange = undefined,
}) => {
  return (
    <div style={{ ...(style || {}) }}>
      <Text size={"2"} as="label">
        {label}
      </Text>
      <TextField.Root
        {...inputProps}
        type={type}
        placeholder={placeholder || label || ""}
        style={inputStyle[size]}
        onChange={(e) => onInputChange?.(e)}
      >
        <TextField.Slot side={iconPosition}>{icon && icon}</TextField.Slot>
      </TextField.Root>
      {errorMessage && (
        <Text size={"1"} color="tomato">
          {errorMessage}
        </Text>
      )}
    </div>
  );
};
