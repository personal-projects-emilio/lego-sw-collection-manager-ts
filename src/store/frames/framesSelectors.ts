import { RootState } from '../index'

export const selectFramesList = (state: RootState) => state.frames.list

export const selectFramesIsLoading = (state: RootState) => state.frames.isLoading

export const selectSingleFrame = (state: RootState, name: string) =>
  state.frames.list?.find((el) => el.name === name) ?? null
