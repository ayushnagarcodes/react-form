import { ComponentProps, useState } from "react";
import { InputBaseProps } from "../types/baseTypes";
import Eye from "../assets/eye.svg";
import EyeOff from "../assets/eye-off.svg";

type InputTextAnimatedProps = {
  type?: "text" | "password" | "email";
  togglePasswordVisibility?: boolean;
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
  togglePasswordVisibility = true,
  ...props
}: InputTextAnimatedProps) {
  // logic for password field
  const [isPassHidden, setIsPassHidden] = useState(true);

  return (
    <div className={`input-animated ${className}`}>
      <div className="input-animated__container">
        <input
          type={type !== "password" ? type : isPassHidden ? "password" : "text"}
          name={name}
          value={value}
          onChange={(e) => onChange?.(name, e.target.value)}
          placeholder=""
          className={`input-animated__field ${
            type === "password" && togglePasswordVisibility
              ? "input-animated__password"
              : ""
          }`}
          id={name}
          {...props}
        />

        <label htmlFor={name} className="input-animated__label">
          {label}
        </label>

        <div className="input-animated__border"></div>

        {type === "password" && togglePasswordVisibility && (
          <button
            type="button"
            className="input__icon"
            onClick={() => setIsPassHidden(!isPassHidden)}
          >
            {isPassHidden ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>

      {error && <span className="input-animated__error">{error}</span>}
    </div>
  );
}

export default InputTextAnimated;
