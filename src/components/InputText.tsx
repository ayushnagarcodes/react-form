import { ComponentProps, useState } from "react";
import { InputBaseProps } from "../types/baseTypes";
import Eye from "../assets/eye.svg";
import EyeOff from "../assets/eye-off.svg";

type InputTextProps = {
  type?: "text" | "password" | "email";
  togglePasswordVisibility?: boolean;
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
  togglePasswordVisibility = true,
  ...props
}: InputTextProps) {
  // logic for password field
  const [isPassHidden, setIsPassHidden] = useState(true);

  return (
    <div className={`input ${className}`}>
      <label htmlFor={name} className="input__label">
        {label}
      </label>

      <input
        type={type !== "password" ? type : isPassHidden ? "password" : "text"}
        name={name}
        value={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        className={`input__field-base ${
          type === "password" && togglePasswordVisibility
            ? "input__field-password"
            : ""
        }`}
        id={name}
        {...props}
      />

      {type === "password" && togglePasswordVisibility && (
        <button
          type="button"
          className="input__icon"
          onClick={() => setIsPassHidden(!isPassHidden)}
        >
          {isPassHidden ? <Eye /> : <EyeOff />}
        </button>
      )}

      {error && <span className="input__error">{error}</span>}
    </div>
  );
}

export default InputText;
