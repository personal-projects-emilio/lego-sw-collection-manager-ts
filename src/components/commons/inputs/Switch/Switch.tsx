import React from "react";
import { SwitchProps } from "../interface";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export const CustomSwitch: React.FC<SwitchProps> = ({
  value,
  label,
  changeHandler,
  muiProps,
}) => {
  const switchElement = (
    <Switch
      checked={value}
      value={value}
      onChange={(_e, checked) => changeHandler(checked)}
      name={label}
      color="primary"
      {...muiProps}
    />
  );
  if (label)
    return (
      <FormControlLabel
        control={switchElement}
        labelPlacement="top"
        label={label}
      />
    );
  return switchElement;
};

export default CustomSwitch;
