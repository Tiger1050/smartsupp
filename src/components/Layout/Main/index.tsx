import Container from '@material-ui/core/Container'
import { styled } from '@material-ui/core/styles'
import React from 'react'

const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const Main: React.FC = ({ children }) => {
  return (
    <StyledContainer maxWidth="md">
      <main>{children}</main>
    </StyledContainer>
  )
}

export default Main
