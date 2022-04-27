export interface FrameMinifig {
  id: string
  set: string
}

export interface Frame {
  name: string
  content: FrameMinifig[]
}

export type FramesList = Frame[]
