# @avarock/react-form

A lightweight, customizable React + TypeScript library for building dynamic forms with SCSS-based styling.

## Installation

Install the package via npm:

```bash
npm i @avarock/react-form
```

## Features

- Pre-styled, customizable form and input components.
- Supports both browser-based and in-built form validation.
- Custom themes (`light` and `dark`).
- Flexible styling with support for `className` and `style` props.

## Usage

Here’s an example of how to use the components:

```tsx
import {
  Form,
  InputText,
  InputTextAnimated,
  InputSelect,
  InputTextArea,
  InputCheckBox,
  InputRadio,
} from "@avarock/react-form";
import "@avarock/react-form/dist/styles.css";

function App() {
  function handleSubmit(formState: Record<string, any>) {
    console.log(formState);
  }

  return (
    <div>
      <Form
        style={{ gridTemplateColumns: "1fr 1fr", maxWidth: "40rem" }}
        onSubmit={handleSubmit}
        theme="light"
        HTMLValidate={false}
        showSubmitBtn={true}
      >
        <InputText
          label="Name"
          name="name"
          placeholder="Enter your name"
          required
        />
        <InputText
          label="Age"
          name="age"
          placeholder="Enter your age"
          type="number"
          required
        />
        <InputTextAnimated type="email" label="Email" name="email" required />
        <InputTextAnimated
          type="password"
          label="Password"
          name="password"
          required
        />
        <InputSelect
          label="City"
          name="city"
          options={[
            { label: "Jaipur", value: "jaipur" },
            { label: "Mumbai", value: "mumbai" },
            { label: "Hyderabad", value: "hyderabad" },
          ]}
          initialOptionLabel="Select City"
          required
        />
        <InputTextArea
          label="Bio"
          name="bio"
          placeholder="Enter your bio"
          maxLength={80}
          required
        />
        <InputCheckBox
          style={{ alignSelf: "end" }}
          label="Allow Cookies"
          name="isCookieEnabled"
        />
        <InputRadio
          name="gender"
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          required
        />
      </Form>
    </div>
  );
}

export default App;
```

## Styling

- Import the library styles:
  ```tsx
  import "@avarock/react-form/dist/styles.css";
  ```
- You can also use the `className` or `style` props to apply custom styles.

## Reference

### **`Form`**

- **Props:**
  - `style`: Inline styles for custom layout.
  - `onSubmit(formState: Record<string, any>)`: Callback function triggered on form submission with form data.
  - `HTMLValidate`: Enable browser-based validation (`true`) or use the library's validation (`false`).  
    **Note**: Currently, library validation only supports `required`, `type="email"`, and `type="password"`.
  - `showSubmitBtn`: Show/hide the submit button.
  - `theme`: Choose between `"light"` and `"dark"` themes.
  - Custom submit button or other elements can be passed as children.

---

### **`InputText`**

- **Props:**
  - `name` (required): Register the field in the form.
  - `label` (required): Display field label.
  - `type`: `"text" | "password" | "email" | "number"`. Default: `"text"`.
  - `togglePasswordVisibility`: Show/hide toggle button for password visibility (if `type="password"`).
  - Any valid `HTMLInputElement` attributes.

---

### **`InputTextAnimated`**

- Similar to `InputText` with the following differences:
  - No `placeholder` prop (uses animation instead).
  - Styles for transition and animation.

---

### **`InputSelect`**

- **Props:**
  - `name` (required): Register the field in the form.
  - `label` (required): Display field label.
  - `options` (required): Array of objects `{ label: string; value: string }` to generate `<option>` elements.
  - `initialOptionLabel`: Placeholder for the dropdown (Default: `"Select"`). Becomes hidden on user toggle, if `required` is set.
  - Any valid `HTMLSelectElement` attributes.

---

### **`InputTextArea`**

- **Props:**
  - `name` (required): Register the field in the form.
  - `label` (required): Display field label.
  - `maxLength`: Sets the limit and also displays an overlay showing the number of characters typed.
  - Custom scrollbars for better UX.
  - Any valid `HTMLTextareaElement` attributes.

---

### **`InputCheckBox`**

- A custom `<input type="checkbox" />` element.
- **Props:**
  - `name` (required): Register the field in the form.
  - `label` (required): Display field label.
  - Any valid `HTMLInputElement` attributes, except `type`, which is set to `"checkbox"`.

---

### **`InputRadio`**

- A group of `<input type="radio" />` elements.
- **Props:**
  - `name` (required): Register the field in the form.
  - `label` (required): Display field label.
  - `options` (required): Array of objects `{ label: string; value: string }` to generate radio buttons.
  - Any valid `HTMLInputElement` attributes, except `type` (set to `"radio"`) and `value` (derived from `options`).
