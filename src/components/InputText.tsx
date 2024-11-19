import { ComponentProps } from "react";
import { InputBaseProps } from "../types/baseTypes";

type InputTextProps = {
  type?: "text" | "password" | "email";
} & InputBaseProps &
  ComponentProps<"input">;

function InputText({
  type = "text",
  name,
  label,
  value,
  onChange,
  error,
  className = "",
  showError,
  ...props
}: InputTextProps) {
  return (
    <div className={`input ${className}`}>
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        className="input__field-base input__field-text"
        id={name}
        {...props}
      />
      {showError && error && <span className="input__error">{error}</span>}
    </div>
  );
}

export default InputText;
