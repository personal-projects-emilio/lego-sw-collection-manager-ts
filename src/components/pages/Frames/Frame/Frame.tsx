import React, { useEffect } from 'react'
import { Box, Chip, styled } from '@mui/material'
import { useAppSelector } from 'hooks'
import { useHistory, useParams } from 'react-router-dom'
import { selectSingleFrame } from 'store/frames'
import { useMinifigs } from 'hooks/useMinifigs'

const StyledImg = styled('img')(() => ({
  width: 'auto',
  maxWidth: '90%',
  maxHeight: '10em',
  // height: theme.spacing(25),
}))

export const Frame = () => {
  const { name } = useParams<{ name: string }>()
  const { minifigsList } = useMinifigs()
  const frame = useAppSelector((state) => selectSingleFrame(state, name))
  const { push } = useHistory()

  useEffect(() => {
    if (!name) {
      push('/frames')
    }
  }, [name, push])

  return (
    <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" justifyContent="center">
      {frame?.content.map((el) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          border="1px solid gray"
          padding={1}
          minHeight="10em"
        >
          {el.id && (
            <>
              <StyledImg
                src={`https://img.bricklink.com/ItemImage/MN/0/${el.id}.png`}
                alt={`${el.id}-bricklink-png`}
              />
              <Box display="flex" flexDirection="column" gap={1} alignItems="center">
                <Chip
                  label={minifigsList?.find(({ id }) => id === el.id)?.characterName}
                  size="small"
                />
                <Chip label={el.id} size="small" />
                <Chip label={el.set} size="small" />
              </Box>
            </>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Frame
