import { Children, cloneElement, useState } from "react";
import type { CSSProperties, ReactElement, FormEvent } from "react";

type FormProps = {
  style?: CSSProperties;
  children: ReactElement[];
  onSubmit: (formState: Record<string, any>) => void;
  HTMLValidate?: boolean;
};

function Form({ style, children, onSubmit, HTMLValidate = false }: FormProps) {
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
    const errors: Record<string, any> = {};

    Children.forEach(children, (child) => {
      if (child.props.required && !formState[child.props.name]) {
        errors[child.props.name] = `* ${child.props.label} is required`;
      }
    });
    console.log(errors);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If no errors, submit the form
    onSubmit(formState);
  }

  return (
    <form
      style={style}
      className="form"
      onSubmit={handleSubmit}
      noValidate={!HTMLValidate}
    >
      {Children.map(children, (child) => {
        return cloneElement(child, {
          value: formState[child.props.name] || "",
          onChange: handleInputChange,
          error: formErrors[child.props.name],
          showError: !HTMLValidate,
        });
      })}
      <button type="submit" className="form__submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
