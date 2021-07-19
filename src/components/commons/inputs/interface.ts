export type InputType = 'radiobuttons' | 'autocomplete'// | 'switch' | 'textflied'

export interface InputsProps<T extends InputType> {
  type: T;
  // value: Value[T];
  // config: Config<T>;
  // changeHandler: ChangeHandler<T>;
  value: any;
  config: any;
  changeHandler: any;
  label: string;
  placeholder?: string;
  valid?: boolean;
  touched?: boolean;
  errorText?: string;
  muiProps?: {};
}

export type ChangeHandler<T> = T extends 'radiobuttons' ? (value: string) => void : (value: any) => void


// export type Value = {
//   radiobuttons: string;
//   autocomplete: string | string[];
// }
// export type Value<T extends InputType> =
//   T extends 'radiobuttons' ? string
//   : T extends 'autocomplete' ? string | string[]
//   : any

// export type Config<T extends InputType> =
//   T extends 'radiobuttons' ? {
//     row?: boolean;
//     options: string[];
// } : T extends 'autocomplete' ? {
//   multiple?: boolean
//   options: {
//     label: string;
//     value: string;
//   }
// } : never;

export type RadioButtonsProps = Omit<InputsProps<"radiobuttons">, "type">;

export type AutoCompleteProps = Omit<InputsProps<"autocomplete">, "type">;
export type AutoCompleteOption = Record<"label" | "value", string>;