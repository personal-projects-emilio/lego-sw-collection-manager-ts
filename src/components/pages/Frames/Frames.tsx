import React, { useEffect } from 'react'
import Loader from 'components/commons/Loader'
import { Box, Tab, Tabs } from '@mui/material'
import { useMinifigs } from 'hooks/useMinifigs'
import { fetchFrames, selectFramesIsLoading, selectFramesList } from 'store/frames'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Link, Redirect, Route, useRouteMatch } from 'react-router-dom'
import { a11yTabProps } from 'utils/a11y'
import Frame from './Frame'

export const Frames = () => {
  const dispatch = useAppDispatch()
  const { isLoading: isMinifigsLoading } = useMinifigs()
  const framesList = useAppSelector(selectFramesList)
  const isFramesLoading = useAppSelector(selectFramesIsLoading)
  const match = useRouteMatch<{ name: string }>('/frames/:name')

  useEffect(() => {
    !framesList && dispatch(fetchFrames())
  }, [framesList, dispatch])

  if (isFramesLoading || isMinifigsLoading || !Array.isArray(framesList)) return <Loader />

  return (
    <Box>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Frames tab navigation"
        value={match?.params?.name || framesList?.[0].name}
      >
        {framesList?.map(({ name }, i) => (
          <Tab
            key={`frame-tab-${name}`}
            label={name}
            value={name}
            component={Link}
            to={`/frames/${name}`}
            {...a11yTabProps('frames', i)}
          />
        ))}
      </Tabs>
      <Route path="/frames/:name" component={Frame} />
      <Redirect to={`/frames/${framesList?.[0].name}`} />
    </Box>
  )
}

export default Frames
