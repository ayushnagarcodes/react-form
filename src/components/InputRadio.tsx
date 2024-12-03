import { ComponentProps } from "react";
import type { InputBaseProps } from "../types/baseTypes";

type InputRadioProps = {
  options: { label: string; value: string }[];
} & InputBaseProps &
  Omit<ComponentProps<"input">, "type" | "value">;

function InputRadio({
  name,
  label,
  value,
  onChangeInput,
  error,
  className = "",
  options,
  ...props
}: InputRadioProps) {
  return (
    <div className={`input ${className}`}>
      <span className="input__label">{label}</span>

      <div className="input__container-radio">
        {options.map(({ label, value: optionValue }) => (
          <div key={optionValue}>
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={(e) => onChangeInput?.(name, e.target.value)}
              className="input__field-radio"
              id={`${name}-${optionValue}`}
              {...props}
            />
            <label
              className="input__label-radio"
              htmlFor={`${name}-${optionValue}`}
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      {error && <span className="input__error">{error}</span>}
    </div>
  );
}

export default InputRadio;
