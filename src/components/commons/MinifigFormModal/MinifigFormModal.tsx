import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Minifig } from "interfaces/minifigs";
import Inputs from "../inputs";
import { useAppSelector } from "hooks/store";
import { selectMinifigsList, selectTagsAndCharacNames } from "store/minifigs";

export interface MinifigFormModalProps {
  handleClose: () => void;
  editMinifig?: Minifig;
}

export const MinifigFormModal: React.FC<MinifigFormModalProps> = ({
  handleClose,
  editMinifig,
}) => {
  const { tags, characNames } = useAppSelector(selectTagsAndCharacNames);
  const minifigsList = useAppSelector(selectMinifigsList);
  const {
    control,
    reset,
    unregister,
    handleSubmit,
    formState: { isValid },
  } = useForm<Minifig>({
    defaultValues: editMinifig || {
      id: "",
      name: "",
      characterName: "",
      tags: [],
      possessed: false,
    },
    mode: "onChange",
  });

  const characNamesOptions = useMemo(
    () =>
      characNames?.map((characName) => ({
        label: characName.name,
        value: characName.name,
      })) || [],
    [characNames]
  );

  const tagsOptions = useMemo(
    () =>
      tags?.map((tag) => ({
        label: tag.name,
        value: tag.name,
      })) || [],
    [tags]
  );

  const minifigsListIds = useMemo(
    () => minifigsList?.map((minifig) => minifig.id) || [],
    [minifigsList]
  );

  const onClose = () => {
    handleClose();
    reset();
    unregister();
  };

  const onSubmit: SubmitHandler<Minifig> = (data) => console.log(data);

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="minifig-form-dialog"
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="minifig-form-dialog">
          {editMinifig ? `Edit ${editMinifig.id}` : "Add a minifig"}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="id"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^sw[0-9]{4}[abcds]?$/,
                    message: "This need to be a minifig reference",
                  },
                  validate: (value) => {
                    if (
                      minifigsListIds.includes(value) &&
                      value !== editMinifig?.id
                    ) {
                      return "This minifig already exists";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Id"
                      placeholder="Minifig id (ex: sw0001a)"
                      type="textfield"
                      muiProps={{
                        disabled: !!editMinifig,
                        error: fieldState.invalid,
                        helperText: fieldState.error?.message,
                        required: true,
                        fullWidth: true,
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field, fieldState }) => (
                  <Inputs
                    {...field}
                    label="Name"
                    placeholder="Minifig name (ex: Battle Droid Tan with Back Plate)"
                    type="textfield"
                    muiProps={{
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                      required: true,
                      fullWidth: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="characterName"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field, fieldState }) => (
                  <Inputs
                    {...field}
                    label="Character Name"
                    placeholder="Character name (ex: Battle Droid)"
                    type="autocomplete"
                    creatable
                    options={characNamesOptions}
                    muiProps={{
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                      required: true,
                      fullWidth: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Inputs
                    {...field}
                    label="Tags"
                    placeholder="Minifig tags (ex: Battle Droid, CIS, Droid)"
                    type="autocomplete"
                    creatable
                    options={tagsOptions}
                    //@ts-ignore
                    multiple
                    muiProps={{
                      fullWidth: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="possessed"
                control={control}
                render={({ field }) => (
                  <Inputs {...field} label="Possessed" type="switch" />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isValid}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MinifigFormModal;
