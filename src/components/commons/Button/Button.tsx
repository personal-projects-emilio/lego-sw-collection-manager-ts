import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginLeft: theme.spacing(1),
    },
  })
);

export const CustomButton: React.FC<CustomButtonProps> = ({
  isLoading,
  children,
  disabled,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {children}
      {isLoading && (
        <CircularProgress className={classes.loader} size="1em" thickness={3} />
      )}
    </Button>
  );
};

export default CustomButton;
