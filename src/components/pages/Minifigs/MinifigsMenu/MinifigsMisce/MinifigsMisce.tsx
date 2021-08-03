import React from "react";
import Button from "@material-ui/core/Button";
import MinifigFormModal from "components/commons/MinifigFormModal/MinifigFormModal";
import { useToggle } from "hooks";

export const MinifigsMisce: React.FC = () => {
  const [addMinifigModalIsOpen, toggleAddMinifigModal] = useToggle(false);

  return (
    <>
      <p>
        Minifigs Miscellanous info (total, percentage owned, add minifig, set
        possession to all)
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleAddMinifigModal()}
      >
        Add a minifig
      </Button>
      {addMinifigModalIsOpen && (
        <MinifigFormModal handleClose={() => toggleAddMinifigModal(false)} />
      )}
    </>
  );
};

export default MinifigsMisce;
