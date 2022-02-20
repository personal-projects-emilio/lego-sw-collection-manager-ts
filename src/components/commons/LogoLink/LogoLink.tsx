import React, { useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import bricksetLogo from "assets/images/logo/brickset.png";
import bricklinkLogo from "assets/images/logo/bricklink.png";

type LogoLinkProps = { id: string } & (
  | { brickset: true; bricklink?: never }
  | { brickset?: never; bricklink: true }
) &
  ({ minifig: true; set?: never } | { minifig?: never; set: true });

export const LogoLink: React.FC<LogoLinkProps> = ({
  bricklink,
  minifig,
  id,
}) => {
  // const classes = useStyles();

  // TODO: Test later but the cost of useMemo first render does not seem worth here
  // const imageSrc = useMemo(
  //   () => (bricklink ? bricklinkLogo : bricksetLogo),
  //   [bricklink]
  // );
  // const alt = useMemo(
  //   () => (bricklink ? "bricklink-logo" : "brickset-logo"),
  //   [bricklink]
  // );

  const linkURL = useMemo(() => {
    if (bricklink)
      return `https://www.bricklink.com/v2/catalog/catalogitem.page?${
        minifig ? "M" : "S"
      }=${id}`;
    else return `https://brickset.com/${minifig ? "minifigs" : "sets"}/${id}`;
  }, [bricklink, minifig, id]);

  return (
    <IconButton
      href={linkURL}
      sx={{
        "& img": {
          height: "2rem",
          width: "2rem",
        },
        margin: 0.5,
        padding: 0.7
      }}
      >
      <img
        alt={bricklink ? "bricklink-logo" : "brickset-logo"}
        src={bricklink ? bricklinkLogo : bricksetLogo}
      />
    </IconButton>
  );
};

export default LogoLink;
