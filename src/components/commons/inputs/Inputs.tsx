import React from "react";
import RadioButtons from "./RadioButtons";
import { InputsProps } from "./interface";
import AutoComplete from "./AutoComplete";
import Switch from "./Switch";

export const Inputs: React.FC<InputsProps> = (props) => {
  // if (type === "textflied") return <TextField {...props}  />
  if (props.type === "switch") return <Switch {...props} />;
  if (props.type === "autocomplete") return <AutoComplete {...props} />;
  if (props.type === "radiobuttons") return <RadioButtons {...props} />;

  return <span>Input not supported</span>;
};

export default Inputs;
