import LinearProgress from '@material-ui/core/LinearProgress'
import { styled } from '@material-ui/core/styles'
import React from 'react'

const StyledLinearProgress = styled(LinearProgress)(() => ({
  visibility: 'hidden',
  '&[data-loading=true]': {
    visibility: 'visible',
  },
}))

export interface ILoadingProps {
  loading?: boolean
  className?: string
}

const Loading: React.FC<ILoadingProps> = ({ children, loading, className }) => {
  return (
    <>
      <StyledLinearProgress data-loading={!!loading} className={className} />
      {!loading && children}
    </>
  )
}

export default Loading
