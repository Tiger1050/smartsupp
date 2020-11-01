import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText'
import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import { styled } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  transition: `transform ${theme.transitions.duration.standard}ms`,
  '&[data-open=true]': {
    transform: 'rotate(180deg)',
  },
}))

export type TData = ListItemTextProps & { subheader?: React.ReactChild }

export interface IListProps {
  data: (TData[] | TData)[]
  dense?: boolean
  divider?: boolean
  inset?: number
  last?: boolean
  loading?: boolean
  subheader?: ListSubheaderProps['children']
  renderPrimary?: ({
    primary,
    index,
  }: {
    primary: ListItemTextProps['primary']
    index: number
  }) => ListItemTextProps['primary']
  renderSecondary?: ({
    secondary,
    index,
  }: {
    secondary: ListItemTextProps['secondary']
    index: number
  }) => ListItemTextProps['secondary']
}

const ListComponent: React.FC<IListProps> = ({
  data,
  dense,
  inset = 0,
  last,
  loading,
  subheader,
  ...restProps
}) => {
  const [open, setOpen] = React.useState<number[]>([])

  return (
    <>
      <List dense={dense}>
        {subheader && <ListSubheader>{subheader}</ListSubheader>}
        {data.map((item, index, array) => (
          <React.Fragment key={`${inset}x${index}`}>
            {Array.isArray(item) ? (
              <ListComponent
                {...restProps}
                data={item}
                inset={inset + 1}
                last={index === array.length - 1}
              />
            ) : (
              <>
                {index === 0 && item.subheader && (
                  <ListItem
                    button
                    onClick={() => {
                      setOpen((prev) => {
                        return prev.includes(inset)
                          ? prev.filter((id) => id !== inset)
                          : [...prev, inset]
                      })
                    }}
                  >
                    <ListItemText>{item.subheader}</ListItemText>
                    <StyledExpandMoreIcon data-open={open.includes(inset)} />
                  </ListItem>
                )}
                <Collapse in={inset === 0 || open.includes(inset)}>
                  <ListItem>
                    <ListItemText
                      {...item}
                      {...(restProps.renderPrimary && {
                        primary: restProps.renderPrimary({
                          primary: item.primary,
                          index,
                        }),
                      })}
                      {...(restProps.renderSecondary && {
                        secondary: restProps.renderSecondary({
                          secondary: item.secondary,
                          index,
                        }),
                      })}
                      inset={inset > 0}
                    />
                  </ListItem>
                  {restProps.divider && index !== array.length - 1 && (
                    <Divider component="li" />
                  )}
                </Collapse>
              </>
            )}
          </React.Fragment>
        ))}
      </List>
      {inset > 0 && !last && <Divider component="li" />}
    </>
  )
}

export default ListComponent
