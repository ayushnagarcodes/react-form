import { Children, cloneElement, useEffect, useState } from "react";
import type { CSSProperties, ReactElement, FormEvent } from "react";
import validateForm, { validateSingleField } from "../utils/validateForm";
import useThrottle from "../hooks/useThrottle";
import useDebounce from "../hooks/useDebounce";

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
  const debouncedSetFormErrors = useDebounce(setFormErrors, 300);
  const throttledHandleSubmit = useThrottle(handleSubmit, 1000);

  function handleInput(name: string, value: any) {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Handling input field validation
    const newErrors = HTMLValidate
      ? {}
      : validateSingleField(
          { ...formState, [name]: value },
          formErrors,
          children,
          name
        );

    // Setting new error state for this input field keeping the rest unchanged
    if (Object.keys(newErrors).length > 0)
      debouncedSetFormErrors({ ...formErrors, ...newErrors });
    else {
      const { [name]: _, ...rest } = formErrors;
      debouncedSetFormErrors(rest);
    }
  }

  function handleSubmit() {
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

  // Initialize formState
  useEffect(() => {
    const initialFormState: Record<string, any> = {};

    Children.forEach(children, (child) => {
      initialFormState[child.props.name] = "";
    });

    setFormState(initialFormState);
  }, []);

  return (
    <form
      style={style}
      className={`form form--${theme}`}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        throttledHandleSubmit();
      }}
      noValidate={!HTMLValidate}
    >
      {Children.map(children, (child) => {
        return cloneElement(child, {
          value: formState[child.props.name] || "",
          onChangeInput: handleInput,
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
