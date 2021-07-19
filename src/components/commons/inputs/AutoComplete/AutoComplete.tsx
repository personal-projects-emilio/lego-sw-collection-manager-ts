import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { AutoCompleteOption, AutoCompleteProps } from "../interface";

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  label,
  value,
  config,
  placeholder,
  changeHandler,
  muiProps,
}) => {
  const [optionValue, setOptionValue] = useState<any>(null);

  // TODO: Manage the multiple choices
  useEffect(() => {
    if (value) {
      const newValue = config.options.find(
        (option: AutoCompleteOption) => option.value === value
      );
      setOptionValue(newValue);
    } else {
      setOptionValue(value);
    }
  }, [value, config.options]);

  const onChangeHandler = useCallback(
    (newValue: AutoCompleteOption | AutoCompleteOption[] | null) => {
      setOptionValue(newValue);
      if (Array.isArray(newValue)) {
        changeHandler(newValue.map((option) => option.value));
      } else {
        changeHandler(newValue ? newValue.value : null);
      }
    },
    [setOptionValue, changeHandler]
  );

  return (
    <Autocomplete
      id={label}
      multiple={!!config.multiple}
      options={config.options}
      autoHighlight
      value={optionValue}
      getOptionLabel={(option: AutoCompleteOption) => option.label}
      onChange={(_e, value) => {
        onChangeHandler(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          InputLabelProps={{ shrink: true }}
        />
      )}
      // TODO: Let the popper/modal/popover on the body or place them in the root?
      // PopperComponent={(props) => (
      //   <Popper {...props} container={document.getElementById("root")} />
      // )}
      {...muiProps}
    />
  );
};

export default AutoComplete;
