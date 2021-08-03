import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { RadioButtonsProps } from "../interface";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    label: {
      textTransform: "capitalize",
    },
  })
);

export const RadioButtons = React.forwardRef<any, RadioButtonsProps>(
  ({ value, label, options, row, ...props }, ref) => {
    const classes = useStyles();
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          ref={ref}
          row={!!row}
          aria-label={label}
          name={label}
          value={value}
          {...props}
          // onChange={(_e, value) => changeHandler(value)}
        >
          {options.map((option) => (
            <FormControlLabel
              className={classes.label}
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
);

export default RadioButtons;
