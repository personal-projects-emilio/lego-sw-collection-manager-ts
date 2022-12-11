import React, { useState, useEffect, useCallback } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { AutoCompleteProps, AutoCompleteOption } from '../interface'

const filter = createFilterOptions<AutoCompleteOption>()

// TODO: Manage case sensitive in filters and treatment

export const AutoComplete = React.forwardRef<any, AutoCompleteProps>(
  ({ label, value, options, multiple, creatable, placeholder, muiProps, onChange }, ref) => {
    const [optionValue, setOptionValue] = useState<
      AutoCompleteOption | AutoCompleteOption[] | null | undefined
    >(multiple ? [] : null)

    useEffect(() => {
      let newValue = null
      if (Array.isArray(value) && multiple && !creatable) {
        newValue = options.filter((option) => value.includes(option.value))
      }
      if (Array.isArray(value) && multiple && creatable) {
        newValue = value.map((value) => ({
          value,
          label: value,
          added: !options.map((option) => option.value).includes(value),
        }))
      }
      if (value && !Array.isArray(value) && !multiple) {
        newValue = options.find((option) => option.value === value)
        if (newValue === undefined && creatable) {
          newValue = {
            label: value,
            value,
            added: true,
          }
        }
        if (newValue === undefined && !creatable) {
          newValue = null
        }
      }
      setOptionValue(newValue)
    }, [value, options, multiple, creatable])

    const onChangeHandler = useCallback(
      (newValue: AutoCompleteOption | AutoCompleteOption[] | null) => {
        setOptionValue(newValue)
        if (Array.isArray(newValue)) {
          // @ts-ignore
          onChange(newValue.map((option) => option.value))
        } else {
          // @ts-ignore
          onChange(newValue ? newValue.value : null)
        }
      },
      [setOptionValue, onChange]
    )

    return (
      <Autocomplete
        id={label}
        multiple={!!multiple}
        options={options}
        autoHighlight
        freeSolo={!!creatable}
        openOnFocus
        value={optionValue}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const trimedInputValue = params.inputValue.trim()
          // Suggest the creation of a new value only if it does not exist in the options or newly created values
          if (
            trimedInputValue !== '' &&
            creatable &&
            ((Array.isArray(optionValue) &&
              !optionValue.find((option) => option.value === trimedInputValue) &&
              !options.find((option) => option.value === trimedInputValue)) ||
              !Array.isArray(optionValue))
          ) {
            filtered.push({
              value: trimedInputValue,
              label: `Add "${trimedInputValue}"`,
              added: true,
            })
          }
          return filtered
        }}
        // isOptionEqualToValue={(option, value) => {
        //   if (value?.added) {
        //     return false;
        //   }
        //   return option.value === value?.value;
        // }}
        getOptionLabel={(option: AutoCompleteOption) => option.label}
        onChange={(_e, value: any) => {
          onChangeHandler(value)
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
    )
  }
)

export default AutoComplete
