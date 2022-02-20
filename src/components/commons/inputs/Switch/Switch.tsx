import React from "react";
import { SwitchProps } from "../interface";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export const CustomSwitch = React.forwardRef<any, SwitchProps>(
  ({ value, label, muiProps, onChange }, ref) => {
    const switchElement = (
      <Switch
        ref={ref}
        checked={value}
        value={value}
        color="primary"
        {...muiProps}
        onChange={onChange}
      />
    );
    if (label)
      return (
        <FormControlLabel
          control={switchElement}
          labelPlacement="start"
          label={label}
        />
      );
    return switchElement;
  }
);

export default CustomSwitch;
