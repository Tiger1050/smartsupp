import MuiAppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Button, { IButton } from './Button'

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: theme.spacing(6),
  },
}))

export interface IAppBar {
  startButton?: IButton
  endButton?: IButton
  heading?: React.ReactChild
}

const AppBar: React.FC<IAppBar> = ({ startButton, endButton, heading }) => {
  const classes = useStyles()
  const { state, pathname } = useLocation<{ backTo?: string }>()
  const { backTo } = state || {}

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item className={classes.button}>
            {(startButton || backTo) && (
              <Button
                icon={<BackIcon />}
                {...startButton}
                to={backTo || startButton?.to}
              />
            )}
          </Grid>
          {heading && (
            <Grid item style={{ alignSelf: 'center' }}>
              {typeof heading === 'string' ? (
                <Typography variant="h5">{heading}</Typography>
              ) : (
                heading
              )}
            </Grid>
          )}
          <Grid item className={classes.button}>
            {endButton ? (
              <Button icon={<CloseIcon />} {...endButton} />
            ) : (
              <>
                {!(pathname === '/posts') && (
                  <Button icon={<HomeIcon />} to="/posts" />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
