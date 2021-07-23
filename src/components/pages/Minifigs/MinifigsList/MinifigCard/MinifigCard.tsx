import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import { Minifig } from "interfaces/minifigs";
import NameAndTags from "./NameAndTags";
import MinifigEdition from "./MinifigEdition";
import LogoLink from "components/commons/LogoLink";

export type MinifigCardProps = Minifig;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      textAlign: "center",
      margin: theme.spacing(1),
      padding: theme.spacing(0.5),
      boxSizing: "border-box",
      height: `calc(100% - ${theme.spacing(1)})`,
    },
    picture: {
      width: "auto",
      maxWidth: "90%",
      maxHeight: "100%",
      // height: theme.spacing(25),
    },
    reference: {
      textTransform: "uppercase",
    },
    item: {
      width: "100%",
      "& hr": {
        width: `calc(100% + ${theme.spacing(1)})`,
        marginLeft: theme.spacing(-0.5),
      },
    },
    tooltip: {
      textAlign: "center",
      maxWidth: "15em",
    },
  })
);

export const MinifigCard: React.FC<MinifigCardProps> = (props) => {
  const classes = useStyles();
  const { id, characterName, name, tags } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          <Tooltip title={name} classes={{ tooltip: classes.tooltip }}>
            <img
              className={classes.picture}
              src={`https://img.bricklink.com/ItemImage/MN/0/${id}.png`}
              alt={`${id}-bricklink-png`}
            />
          </Tooltip>
        </Grid>
        <Grid item className={classes.item}>
          <Typography className={classes.reference}>{id}</Typography>
          <Divider variant="fullWidth" />
          <NameAndTags characterName={characterName} tags={tags} />
          <Divider variant="fullWidth" />
          <LogoLink id={id} bricklink minifig />
          <LogoLink id={id} brickset minifig />
          <Divider variant="fullWidth" />
          <MinifigEdition {...props} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MinifigCard;
