export type DefaultInputsProps = {
  placeholder?: string
  id?: string
  muiProps?: {}
  onChange?: () => void
}

export type AutoCompleteOption = {
  label: string
  value: string
  added?: boolean
}
export type AutoCompleteInputsProps = {
  type: 'autocomplete'
  value: string | null
  label: string
  placeholder?: string
  options: AutoCompleteOption[]
  multiple?: false
  creatable?: boolean
}
export type AutoCompleteMultipleInputsProps = {
  type: 'autocomplete'
  value: string[] | null
  label: string
  placeholder?: string
  options: AutoCompleteOption[]
  multiple?: true
  creatable?: boolean
}

export type AutoCompleteProps = DefaultInputsProps &
  (Omit<AutoCompleteInputsProps, 'type'> | Omit<AutoCompleteMultipleInputsProps, 'type'>)

export type RadioButtonsInputsProps = {
  type: 'radiobuttons'
  value: string
  label: string
  placeholder?: never
  row?: boolean
  options: string[]
}
export type RadioButtonsProps = DefaultInputsProps & Omit<RadioButtonsInputsProps, 'type'>

export type SwitchInputsProps = {
  type: 'switch'
  value: boolean
  label?: string
  placeholder?: never
  config?: never
}
export type SwitchProps = DefaultInputsProps & Omit<SwitchInputsProps, 'type'>

export type TextFieldInputsProps = {
  type: 'textfield'
  value: string
  label: string
  placeholder?: string
}

export type TextFieldProps = DefaultInputsProps & Omit<TextFieldInputsProps, 'type'>

export type InputsProps = DefaultInputsProps &
  (
    | AutoCompleteInputsProps
    | AutoCompleteMultipleInputsProps
    | RadioButtonsInputsProps
    | SwitchInputsProps
    | TextFieldInputsProps
  )
