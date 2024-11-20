import { ComponentProps, useState } from "react";
import type { ChangeEvent } from "react";
import type { InputBaseProps } from "../types/baseTypes";

type InputTextAreaProps = InputBaseProps & ComponentProps<"textarea">;

function InputTextArea({
  name,
  label,
  value,
  onChange,
  error,
  className = "",
  ...props
}: InputTextAreaProps) {
  const [count, setCount] = useState(0);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(name, e.target.value);
    setCount(e.target.value.length);
  }

  return (
    <div className={`input ${className}`}>
      <label htmlFor={name} className="input__label">
        {label}
      </label>

      <div className="input__container">
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          className={`input__field-base input__field-textarea ${
            error ? "input__field-base--error" : ""
          }`}
          id={name}
          {...props}
        />
        {props.maxLength && (
          <span className="input__count">{`${count}/${props.maxLength}`}</span>
        )}
      </div>

      {error && <span className="input__error">{error}</span>}
    </div>
  );
}

export default InputTextArea;
