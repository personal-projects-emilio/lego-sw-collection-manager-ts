export type DefaultInputsProps = {
  placeholder?: string;
  valid?: boolean;
  touched?: boolean;
  errorText?: string;
  muiProps?: {};
}

export type AutoCompleteOption = Record<"label" | "value", string>;
export type AutoCompleteInputsProps = {
  type: 'autocomplete';
  value: string | null;
  changeHandler: (newValue: string | null) => void;
  label: string;
  placeholder?: string;
  options: AutoCompleteOption[];
  multiple?: never;
}
export type AutoCompleteMultipleInputsProps = {
  type: 'autocomplete';
  value: string[] | null;
  changeHandler: (newValue: string[] | null) => void;
  label: string;
  placeholder?: string;
  options: AutoCompleteOption[];
  multiple: true;
}

export type AutoCompleteProps = DefaultInputsProps & (AutoCompleteInputsProps | AutoCompleteMultipleInputsProps);

export type RadioButtonsInputsProps = {
  type: 'radiobuttons';
  value: string;
  changeHandler: (newValue: string) => void;
  label: string;
  placeholder?: never;
  row?: boolean;
  options: string[]
}
export type RadioButtonsProps = DefaultInputsProps & RadioButtonsInputsProps;

export type SwitchInputsProps = {
  type: 'switch';
  value: boolean;
  changeHandler: (newValue: boolean) => void;
  label?: string;
  placeholder?: never;
  config?: never;
}
export type SwitchProps = DefaultInputsProps & SwitchInputsProps;

export type InputsProps = DefaultInputsProps & (
  AutoCompleteInputsProps |
  AutoCompleteMultipleInputsProps |
  RadioButtonsInputsProps |
  SwitchInputsProps)