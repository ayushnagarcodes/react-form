import { ComponentProps } from "react";
import { InputBaseProps } from "../types/baseTypes";

type InputTextAnimatedProps = {
  type?: "text" | "password" | "email";
} & InputBaseProps &
  Omit<ComponentProps<"input">, "placeholder">;

function InputTextAnimated({
  type = "text",
  name,
  label,
  value,
  onChange,
  error,
  className = "",
  showError,
  ...props
}: InputTextAnimatedProps) {
  return (
    <div className={`input-animated ${className}`}>
      <div className="input-animated__container">
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange?.(name, e.target.value)}
          placeholder=""
          className="input-animated__field"
          id={name}
          {...props}
        />
        <label htmlFor={name} className="input-animated__label">
          {label}
        </label>
        <div className="input-animated__border"></div>
      </div>
      {showError && error && (
        <span className="input-animated__error">{error}</span>
      )}
    </div>
  );
}

export default InputTextAnimated;
