import React, { useState, useEffect, useCallback } from "react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { AutoCompleteProps, AutoCompleteOption } from "../interface";

const filter = createFilterOptions<AutoCompleteOption>();

// TODO: Manage case sensitive in filters and treatment

export const AutoComplete = React.forwardRef<any, AutoCompleteProps>(
  (
    {
      label,
      value,
      options,
      multiple,
      creatable,
      placeholder,
      muiProps,
      onChange,
    },
    ref
  ) => {
    const [optionValue, setOptionValue] = useState<
      AutoCompleteOption | AutoCompleteOption[] | null | undefined
    >(multiple ? [] : null);

    useEffect(() => {
      let newValue = null;
      if (Array.isArray(value) && multiple && !creatable) {
        newValue = options.filter((option) => value.includes(option.value));
      }
      if (Array.isArray(value) && multiple && !!creatable) {
        newValue = value.map((value) => ({
          value,
          label: value,
          added: !options.map((option) => option.value).includes(value),
        }));
      }
      if (value && !Array.isArray(value) && !multiple) {
        newValue = options.find((option) => option.value === value);
        if (newValue === undefined && creatable) {
          newValue = {
            label: value,
            value,
            added: true,
          };
        }
      }
      setOptionValue(newValue);
    }, [value, options, multiple, creatable]);

    const onChangeHandler = useCallback(
      (newValue: AutoCompleteOption | AutoCompleteOption[] | null) => {
        setOptionValue(newValue);
        if (Array.isArray(newValue)) {
          // @ts-ignore
          onChange(newValue.map((option) => option.value));
        } else {
          // @ts-ignore
          onChange(newValue ? newValue.value : null);
        }
      },
      [setOptionValue, onChange]
    );

    return (
      <Autocomplete
        id={label}
        multiple={!!multiple}
        options={options}
        autoHighlight
        freeSolo={!!creatable}
        selectOnFocus={!!creatable}
        clearOnBlur={!!creatable}
        handleHomeEndKeys={!!creatable}
        value={optionValue}
        filterOptions={(options: AutoCompleteOption[], params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value only if it does not exist in the options or newly created values
          if (
            params.inputValue !== "" &&
            !!creatable &&
            ((Array.isArray(optionValue) &&
              !optionValue.find(
                (option) => option.value === params.inputValue
              ) &&
              !options.find((option) => option.value === params.inputValue)) ||
              !Array.isArray(optionValue))
          ) {
            filtered.push({
              value: params.inputValue,
              label: `Add "${params.inputValue}"`,
              added: true,
            });
          }
          return filtered;
        }}
        getOptionSelected={(option, value) => {
          if (value?.added) {
            return false;
          }
          return option.value === value.value;
        }}
        getOptionLabel={(option: AutoCompleteOption) => option.label}
        onChange={(_e, value: any) => {
          onChangeHandler(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            ref={ref}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            {...muiProps}
          />
        )}
        // TODO: Let the popper/modal/popover on the body or place them in the root?
        // PopperComponent={(props) => (
        //   <Popper {...props} container={document.getElementById("root")} />
        // )}
      />
    );
  }
);

export default AutoComplete;
