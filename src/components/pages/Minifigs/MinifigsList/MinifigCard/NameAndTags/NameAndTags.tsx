import React, { useCallback } from "react";
import { Minifig } from "interfaces/minifigs";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { selectMinifigsFilters, setMinifigsFilters } from "store/minifigs";

export type NameAndTagsProps = Pick<Minifig, "tags" | "characterName">;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
      borderRadius: "12px",
      height: "auto",
      padding: `${theme.spacing(0.75)} 0`,
      maxWidth: `calc(100% - ${theme.spacing(1)})`,
    },
    label: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block",
    },
    deleteIcon: {
      height: theme.spacing(1.4),
      width: theme.spacing(1.4),
    },
  })
);

export const NameAndTags: React.FC<NameAndTagsProps> = ({
  tags,
  characterName,
}) => {
  const filters = useAppSelector(selectMinifigsFilters);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const characNameHandler = useCallback(
    (characName: string | null) => {
      dispatch(setMinifigsFilters({ characName }));
    },
    [dispatch]
  );

  const tagHandler = useCallback(
    (tag: string | null) => {
      dispatch(setMinifigsFilters({ tag }));
    },
    [dispatch]
  );

  return (
    <>
      <Chip
        label={characterName}
        data-testid="character-name-chip"
        classes={{
          root: classes.chip,
          label: classes.label,
          deleteIcon: classes.deleteIcon,
        }}
        clickable={characterName !== filters.characName}
        color={characterName === filters.characName ? "primary" : "default"}
        onClick={() => characNameHandler(characterName)}
        onDelete={
          characterName === filters.characName
            ? () => characNameHandler(null)
            : undefined
        }
      />
      {Array.isArray(tags) && tags.length > 0 && (
        <Divider variant="fullWidth" />
      )}
      {tags?.map((tag) => (
        <Chip
          key={`${characterName}-${tag}`}
          data-testid={`tag-${tag}-chip`}
          label={tag}
          classes={{
            root: classes.chip,
            label: classes.label,
            deleteIcon: classes.deleteIcon,
          }}
          clickable={tag !== filters.tag}
          color={tag === filters.tag ? "primary" : "default"}
          onClick={() => tagHandler(tag)}
          onDelete={tag === filters.tag ? () => tagHandler(null) : undefined}
        />
      ))}
    </>
  );
};

export default NameAndTags;
