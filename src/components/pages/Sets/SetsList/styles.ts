import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))
