export type InputBaseProps = {
  name: string;
  label: string;
  value?: string;
  onChange?: (name: string, value: any) => void;
  error?: string;
  className?: string;
};
