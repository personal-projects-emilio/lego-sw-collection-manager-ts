import React, { useMemo, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Inputs from "components/commons/inputs";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectMinifigsFilters,
  selectTagsAndCharacNames,
  setMinifigsFilters,
} from "store/minifigs";
import { useForm, Controller, useWatch } from "react-hook-form";
import { MinifigsFilters as MinifigsFiltersType } from "interfaces/minifigs";
import isEqual from "fast-deep-equal";
import usePrevious from "hooks/usePrevious";

export const MinifigsFilters: React.FC = () => {
  const { tags, characNames } = useAppSelector(selectTagsAndCharacNames);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectMinifigsFilters);
  const previousFilters = usePrevious(filters);
  const { control, reset } = useForm<MinifigsFiltersType>({
    defaultValues: filters,
  });
  const filtersFormValues = useWatch({
    control: control,
    defaultValue: filters,
  });
  const previousFiltersFormValues = usePrevious(filtersFormValues);

  useEffect(() => {
    // If the filtersFormValues change and not the filters that means the form
    // was changed so we set the store accordingly
    if (
      !isEqual(filters, filtersFormValues) &&
      !isEqual(previousFiltersFormValues, filtersFormValues)
    ) {
      dispatch(setMinifigsFilters(filtersFormValues));
    }
  }, [dispatch, filtersFormValues, previousFiltersFormValues, filters]);

  useEffect(() => {
    // If the filters change and not the filtersFormValues that means the
    // filters were reset in the store so we reset the form
    if (
      !isEqual(filters, previousFilters) &&
      !isEqual(filters, filtersFormValues)
    ) {
      reset(filters);
    }
  }, [filters, previousFilters, filtersFormValues, reset]);

  const characNamesOptions = useMemo(
    () =>
      characNames?.map((characName) => ({
        label: `${characName.name} (${characName.amount})`,
        value: characName.name,
      })) || [],
    [characNames]
  );

  const tagsOptions = useMemo(
    () =>
      tags?.map((tag) => ({
        label: `${tag.name} (${tag.amount})`,
        value: tag.name,
      })) || [],
    [tags]
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Controller
          name="show"
          control={control}
          render={({ field }) => (
            <Inputs
              {...field}
              label="Show"
              type="radiobuttons"
              row
              options={["all", "owned", "missing"]}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="characName"
          control={control}
          render={({ field }) => (
            <Inputs
              {...field}
              label="Character Name"
              type="autocomplete"
              placeholder="Filter by character name"
              options={characNamesOptions}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <Inputs
              {...field}
              label="Tag"
              type="autocomplete"
              placeholder="Filter by tag"
              options={tagsOptions}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default MinifigsFilters;
