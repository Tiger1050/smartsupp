import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface IButton {
  to?: LinkProps['to']
  onClick?: (e: any) => void
  icon?: JSX.Element
}

const Button: React.FC<IButton> = ({ to, icon, onClick }) => {
  return (
    <IconButton {...(!!to && { to, component: Link })} onClick={onClick} color="inherit">
      {icon}
    </IconButton>
  )
}

export default Button
