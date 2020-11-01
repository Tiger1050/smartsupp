import blue from '@material-ui/core/colors/blue'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import createPalette from '@material-ui/core/styles/createPalette'

export const createTheme = () => {
  const palette = createPalette({
    type: 'light',
    primary: blue,
  })

  const theme = createMuiTheme({
    palette,
  })

  return theme
}
