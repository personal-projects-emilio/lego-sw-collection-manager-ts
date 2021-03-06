import React, { useCallback } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useAppDispatch, useAppSelector } from "hooks/store";
import {
  selectMinifigsPagination,
  setMinifigsPagination,
} from "store/minifigs";

export const MinifigsPagination: React.FC = () => {
  const pagination = useAppSelector(selectMinifigsPagination);
  const dispatch = useAppDispatch();
  const { activePage, nbPerPage, total } = pagination;

  const getLabelDisplayRows = useCallback(
    ({ from, to, count }) => {
      if (total <= nbPerPage) return `${from} - ${to}`;
      return `${from} - ${to} of ${count}`;
    },
    [nbPerPage, total]
  );

  return (
    <TablePagination
      data-testid="minifigs-pagination"
      count={total}
      page={activePage}
      component="div"
      labelRowsPerPage=""
      SelectProps={{
        "aria-label": "Minifigs per page",
        //@ts-expect-error
        "data-testid": "minifigs-pagination-select",
      }}
      rowsPerPageOptions={[
        { value: 25, label: "25/page" },
        { value: 50, label: "50/page" },
        { value: 100, label: "100/page" },
        { value: 200, label: "200/page" },
      ]}
      labelDisplayedRows={getLabelDisplayRows}
      rowsPerPage={nbPerPage}
      onPageChange={(_e, newPage) => {
        dispatch(setMinifigsPagination({ ...pagination, activePage: newPage }));
      }}
      onRowsPerPageChange={(e) => {
        const newNbPerPage = parseInt(e.target.value, 10);
        dispatch(
          setMinifigsPagination({
            ...pagination,
            nbPerPage: newNbPerPage,
            activePage: 0,
          })
        );
      }}
      sx={{
        '& .MuiTablePagination-spacer': {
          display: "none",
          flex: "none"
        },
        '& .MuiTablePagination-toolbar': {
          justifyContent: "center"
        },
      }}
    />
  );
};

export default MinifigsPagination;
