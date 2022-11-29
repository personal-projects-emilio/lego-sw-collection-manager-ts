import React from 'react'
import ListPagination from 'components/commons/ListPagination'
import { useAppDispatch, useAppSelector } from 'hooks/store'
import { selectSetsPagination, setSetsPagination } from 'store/sets'

export const SetsPagination: React.FC = () => {
  const pagination = useAppSelector(selectSetsPagination)
  const dispatch = useAppDispatch()
  return (
    <ListPagination
      pagination={pagination}
      label="Sets"
      options={[10, 25, 50, 100]}
      onPageChange={(_e, newPage) => {
        dispatch(setSetsPagination({ ...pagination, activePage: newPage }))
      }}
      onRowsPerPageChange={(e) => {
        const newNbPerPage = parseInt(e.target.value, 10)
        dispatch(
          setSetsPagination({
            ...pagination,
            nbPerPage: newNbPerPage,
            activePage: 0,
          })
        )
      }}
    />
  )
}

export default SetsPagination
