import { Children, cloneElement, useState } from "react";
import type { CSSProperties, ReactElement, FormEvent } from "react";
import validateForm from "../utils/validateForm";

type FormProps = {
  style?: CSSProperties;
  children: ReactElement | ReactElement[];
  onSubmit: (formState: Record<string, any>) => void;
  HTMLValidate?: boolean;
  showSubmitBtn?: boolean;
  theme?: "light" | "dark";
};

function Form({
  style,
  children,
  onSubmit,
  HTMLValidate = false,
  showSubmitBtn = true,
  theme = "light",
}: FormProps) {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, any>>({});

  function handleInputChange(name: string, value: any) {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Handling form validation
    const errors = HTMLValidate ? {} : validateForm(formState, children);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If no errors, submit the form
    setFormErrors({});
    onSubmit(formState);
  }

  return (
    <form
      style={style}
      className={`form form--${theme}`}
      onSubmit={handleSubmit}
      noValidate={!HTMLValidate}
    >
      {Children.map(children, (child) => {
        return cloneElement(child, {
          value: formState[child.props.name] || "",
          onChange: handleInputChange,
          error: formErrors[child.props.name],
        });
      })}
      {showSubmitBtn && (
        <button type="submit" className="form__submit">
          Submit
        </button>
      )}
    </form>
  );
}

export default Form;
