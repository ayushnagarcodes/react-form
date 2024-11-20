export type InputBaseProps = {
  name: string;
  label: string;
  value?: string;
  onChangeInput?: (name: string, value: any) => void;
  error?: string;
  className?: string;
};
