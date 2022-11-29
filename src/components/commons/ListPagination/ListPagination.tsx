import React, { useCallback } from 'react'
import TablePagination, { TablePaginationProps } from '@mui/material/TablePagination'
import { Pagination } from 'types/misce'

export type ListPaginationnProps = {
  pagination: Pagination
  label: string
  options?: number[]
} & Omit<TablePaginationProps, 'count' | 'page' | 'rowsPerPage'>

export const ListPagination: React.FC<ListPaginationnProps> = ({
  pagination,
  label,
  onPageChange,
  sx,
  options = [25, 50, 100, 200],
  ...props
}) => {
  const { activePage, nbPerPage, total } = pagination

  const getLabelDisplayRows = useCallback(
    ({ from, to, count }) => {
      if (total <= nbPerPage) return `${from} - ${to}`
      return `${from} - ${to} of ${count}`
    },
    [nbPerPage, total]
  )

  return (
    <TablePagination
      data-testid={`${label}-pagination`}
      count={total}
      page={activePage}
      rowsPerPage={nbPerPage}
      component="div"
      labelRowsPerPage=""
      SelectProps={{
        'aria-label': `${label} per page`,
        inputProps: {
          'data-testid': `${label}-pagination-select`,
        },
      }}
      rowsPerPageOptions={options.map((option) => ({ value: option, label: `${option}/page` }))}
      labelDisplayedRows={getLabelDisplayRows}
      onPageChange={onPageChange}
      sx={{
        '& .MuiTablePagination-spacer': {
          display: 'none',
          flex: 'none',
        },
        '& .MuiTablePagination-toolbar': {
          justifyContent: 'center',
        },
        ...sx,
      }}
      {...props}
    />
  )
}

export default ListPagination
