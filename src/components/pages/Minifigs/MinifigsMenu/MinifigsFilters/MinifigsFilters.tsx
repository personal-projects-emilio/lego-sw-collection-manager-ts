import React, { useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import Inputs from "components/commons/inputs";
import { useAppDispatch, useAppSelector } from "hooks/store";
import {
  selectMinifigsFilters,
  selectTagsAndCharacNames,
  setMinifigsFilters,
} from "store/minifigs";

export const MinifigsFilters: React.FC = () => {
  const { tags, characNames } = useAppSelector(selectTagsAndCharacNames);
  const filters = useAppSelector(selectMinifigsFilters);
  const dispatch = useAppDispatch();

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
        <Inputs
          label="Show"
          type="radiobuttons"
          value={filters.show}
          changeHandler={(newValue: "all" | "owned" | "missing") =>
            dispatch(setMinifigsFilters({ ...filters, show: newValue }))
          }
          config={{
            row: true,
            options: ["all", "owned", "missing"],
          }}
        />
      </Grid>
      <Grid item>
        <Inputs
          label="Character Name"
          type="autocomplete"
          value={filters.characName}
          changeHandler={(newValue: string | null) =>
            dispatch(setMinifigsFilters({ ...filters, characName: newValue }))
          }
          placeholder="Filter by character name"
          config={{
            options: characNamesOptions,
          }}
        />
      </Grid>
      <Grid item>
        <Inputs
          label="Tag"
          type="autocomplete"
          value={filters.tag}
          changeHandler={(newValue: string | null) =>
            dispatch(setMinifigsFilters({ ...filters, tag: newValue }))
          }
          placeholder="Filter by tag"
          config={{
            options: tagsOptions,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default MinifigsFilters;