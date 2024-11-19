import { ComponentProps } from "react";
import type { InputBaseProps } from "../types/baseTypes";
import ChevronDown from "../assets/chevron-down.svg";

type InputSelectProps = {
  options: { label: string; value: string }[];
  initialOptionLabel?: string;
} & InputBaseProps &
  ComponentProps<"select">;

function InputSelect({
  name,
  label,
  value,
  onChange,
  error,
  className = "",
  options,
  initialOptionLabel = "Select",
  ...props
}: InputSelectProps) {
  return (
    <div className={`input ${className}`}>
      <label htmlFor={name} className="input__label">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        className="input__field-base input__field-select"
        id={name}
        {...props}
      >
        <option hidden value="">
          {initialOptionLabel}
        </option>
        {options.map(({ label, value }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="input__icon">
        <ChevronDown />
      </div>

      {error && <span className="input__error">{error}</span>}
    </div>
  );
}

export default InputSelect;
