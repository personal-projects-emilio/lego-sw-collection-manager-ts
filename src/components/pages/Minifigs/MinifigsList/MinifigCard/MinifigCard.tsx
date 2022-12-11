import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { Minifig } from 'types/minifigs'
import NameAndTags from './NameAndTags'
import MinifigEdition from './MinifigEdition'
import LogoLink from 'components/commons/LogoLink'
import { styled } from '@mui/material/styles'

export type MinifigCardProps = Minifig

const StyledImg = styled('img')(() => ({
  width: 'auto',
  maxWidth: '90%',
  maxHeight: '100%',
  // height: theme.spacing(25),
}))

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '15em',
    textAlign: 'center',
  },
})

export const MinifigCard: React.FC<MinifigCardProps> = (props) => {
  const { id, characterName, name, tags } = props
  return (
    <Paper
      sx={{
        display: 'flex',
        textAlign: 'center',
        margin: 1,
        padding: 0.5,
        boxSizing: 'border-box',
        height: (theme) => `calc(100% - ${theme.spacing(1)})`,
        width: (theme) => `calc(100% - ${theme.spacing(1)})`,
      }}
    >
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          <CustomWidthTooltip title={name}>
            <StyledImg
              src={`https://img.bricklink.com/ItemImage/MN/0/${id}.png`}
              alt={`${id}-bricklink-png`}
            />
          </CustomWidthTooltip>
        </Grid>
        <Grid
          item
          sx={{
            width: 1,
            '& .MuiDivider-root': {
              width: (theme) => `calc(100% + ${theme.spacing(1)})`,
              marginLeft: -0.5,
            },
          }}
        >
          <Typography sx={{ textTransform: 'uppercase' }}>{id}</Typography>
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
  )
}

export default MinifigCard
