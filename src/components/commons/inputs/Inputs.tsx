import React from "react";
import RadioButtons from "./RadioButtons";
import { InputsProps, InputType } from "./interface";
import AutoComplete from "./AutoComplete";

export const Inputs = <T extends InputType>({
  type,
  ...props
}: InputsProps<T>): JSX.Element => {
  // if (type === "textflied") return <TextField {...props}  />
  // if (type === "switch") return <Switch {...props} />
  if (type === "autocomplete") return <AutoComplete {...props} />;
  if (type === "radiobuttons") return <RadioButtons {...props} />;

  return <span>Input not supported</span>;
};

export default Inputs;
