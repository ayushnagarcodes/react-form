import { Children } from "react";
import type { ReactElement } from "react";
import {
  validateEmailField,
  validatePasswordField,
  validateRequiredField,
} from "./validators";

export function validateSingleField(
  formState: Record<string, any>,
  formErrors: Record<string, any>,
  children: ReactElement | ReactElement[],
  name: string
): Record<string, any> {
  const errors: Record<string, any> = {};

  let targetChild: ReactElement | null = null;
  Children.forEach(children, (child) => {
    if (child.props.name === name) {
      targetChild = child;
    }
  });
  if (!targetChild) return errors;

  const child = targetChild as ReactElement;
  if (!formErrors[name] && String(formState[name]).length < 3) return errors;

  if (!validateRequiredField(formState, child, errors)) return errors;
  if (!validateEmailField(formState, child, errors)) return errors;
  if (!validatePasswordField(formState, child, errors)) return errors;

  return errors;
}

function validateForm(
  formState: Record<string, any>,
  children: ReactElement | ReactElement[]
): Record<string, any> {
  const errors: Record<string, any> = {};

  Children.forEach(children, (child) => {
    if (!validateRequiredField(formState, child, errors)) return;
    if (!validateEmailField(formState, child, errors)) return;
    if (!validatePasswordField(formState, child, errors)) return;
  });

  return errors;
}

export default validateForm;
