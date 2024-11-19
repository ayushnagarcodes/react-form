import { Children } from "react";
import type { ReactElement } from "react";

function validateForm(
  formState: Record<string, any>,
  children: ReactElement[]
): Record<string, any> {
  const errors: Record<string, any> = {};

  Children.forEach(children, (child) => {
    // for required fields
    if (child.props.required && !formState[child.props.name]) {
      errors[child.props.name] = `* ${child.props.label} is required`;
      return;
    }

    // for email fields
    if (child.props.type === "email") {
      const emailRegex =
        child.props?.pattern ||
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(formState[child.props.name])) {
        errors[child.props.name] = `* Invalid email address`;
      }

      return;
    }

    // for password fields
    if (child.props.type === "password") {
      const passwordRegex =
        child.props?.pattern ||
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(formState[child.props.name])) {
        errors[child.props.name] =
          `* Invalid password (a-z, A-Z, 0-9, min 8 chars)`;
      }

      return;
    }
  });

  return errors;
}

export default validateForm;
