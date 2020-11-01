import { styled } from '@material-ui/core/styles'
import React from 'react'
import Loading, { ILoadingProps } from '../Loading'
import AppBar, { IAppBar } from './AppBar'
import Main from './Main'

const StyledLoading = styled(Loading)(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    position: 'absolute',
    width: '100%',
    zIndex: theme.zIndex.appBar,
  },
}))

interface ILayoutProps extends IAppBar, ILoadingProps {}

const Layout: React.FC<ILayoutProps> = ({
  children,
  endButton,
  startButton,
  heading,
  loading,
}) => {
  return (
    <>
      <AppBar
        endButton={endButton}
        startButton={startButton}
        heading={heading}
      />
      <StyledLoading loading={loading}>
        <Main>{children}</Main>
      </StyledLoading>
    </>
  )
}

export default Layout
