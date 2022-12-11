import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const StyledSetCardContainer = styled(Paper)(({ theme }) => ({
  display: 'grid',
  padding: theme.spacing(1),
  gridGap: theme.spacing(1),
  boxSizing: 'border-box',
  gridTemplateColumns: '30% 20% 25% 25%',
}))
