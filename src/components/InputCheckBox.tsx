import { ComponentProps } from "react";
import type { InputBaseProps } from "../types/baseTypes";

type InputCheckBoxProps = InputBaseProps &
  Omit<ComponentProps<"input">, "type">;

function InputCheckBox({
  name,
  label,
  value,
  onChange,
  error,
  className = "",
  ...props
}: InputCheckBoxProps) {
  return (
    <div className={`input ${className}`}>
      <div className="input__container-checkbox">
        <label className="input__label" htmlFor={name}>
          {label}
        </label>
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={(e) => onChange?.(name, e.target.checked)}
          className="input__field-checkbox"
          id={name}
          {...props}
        />
      </div>

      {error && <span className="input__error">{error}</span>}
    </div>
  );
}

export default InputCheckBox;
