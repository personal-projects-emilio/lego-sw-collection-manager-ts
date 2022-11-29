import React from 'react'
import ListPagination from 'components/commons/ListPagination'
import { useAppDispatch, useAppSelector } from 'hooks/store'
import { selectMinifigsPagination, setMinifigsPagination } from 'store/minifigs'

export const MinifigsPagination: React.FC = () => {
  const pagination = useAppSelector(selectMinifigsPagination)
  const dispatch = useAppDispatch()
  return (
    <ListPagination
      pagination={pagination}
      label="Minifigs"
      onPageChange={(_e, newPage) => {
        dispatch(setMinifigsPagination({ ...pagination, activePage: newPage }))
      }}
      onRowsPerPageChange={(e) => {
        const newNbPerPage = parseInt(e.target.value, 10)
        dispatch(
          setMinifigsPagination({
            ...pagination,
            nbPerPage: newNbPerPage,
            activePage: 0,
          })
        )
      }}
    />
  )
}

export default MinifigsPagination
