import type { ReactElement } from "react";

type ValidatorFunction = (
  formState: Record<string, any>,
  child: ReactElement,
  errors: Record<string, any>
) => boolean;

export const validateRequiredField: ValidatorFunction = (
  formState,
  child,
  errors
) => {
  if (child.props.required && !formState[child.props.name]) {
    errors[child.props.name] = `* ${child.props.label} is required`;
    return false;
  }
  return true;
};

export const validateEmailField: ValidatorFunction = (
  formState,
  child,
  errors
) => {
  if (child.props.type === "email") {
    const emailRegex =
      child.props?.pattern ||
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formState[child.props.name])) {
      errors[child.props.name] = `* Invalid email address`;
    }

    return false;
  }
  return true;
};

export const validatePasswordField: ValidatorFunction = (
  formState,
  child,
  errors
) => {
  if (child.props.type === "password") {
    const passwordRegex =
      child.props?.pattern ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formState[child.props.name])) {
      errors[child.props.name] =
        `* Invalid password (a-z, A-Z, 0-9, min 8 chars)`;
    }

    return false;
  }
  return true;
};
