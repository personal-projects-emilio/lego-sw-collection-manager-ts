export interface Minifig {
  id: string
  characterName: string
  name: string
  possessed: boolean
  tags: string[]
}

export type MinifigsList = Minifig[]

export type MinifigsFilters = {
  show: 'all' | 'owned' | 'missing'
  characName: string | null
  tag: string | null
}

export type MinifigsPagination = {
  activePage: number
  total: number
  nbPerPage: number
}
