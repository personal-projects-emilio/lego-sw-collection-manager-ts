import React from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Set } from 'types/sets'
import { StyledSetCardContainer } from './style'
import { useToggle } from 'hooks'
import SetFormModal from 'components/commons/SetFormModal/SetFormModal'

export type SetCardProps = Set

export const MinifigCard: React.FC<SetCardProps> = (props) => {
  const [isEditModalOpen, toggleEditModalOpen] = useToggle()

  return (
    <>
      <StyledSetCardContainer>
        <img
          src={`https://images.brickset.com/sets/small/${props.id}-1.jpg`}
          alt={`${props.id}: ${props.name}`}
          loading="lazy"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            justifySelf: 'center',
          }}
        />
        <Typography
          variant="h4"
          sx={{
            gridColumn: 'span 3',
          }}
        >{`${props.id}: ${props.name}`}</Typography>
        <Tooltip title="Edit" aria-label="Edit tooltip">
          <IconButton
            onClick={() => toggleEditModalOpen()}
            arial-label="edit"
            sx={{ justifySelf: 'center', alignSelf: 'center' }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </StyledSetCardContainer>
      {isEditModalOpen && (
        <SetFormModal handleClose={() => toggleEditModalOpen()} editSetData={props} />
      )}
    </>
  )
}

export default MinifigCard
