import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { createTheme } from './theme'

const Theme: React.FC = ({ children }) => {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme
