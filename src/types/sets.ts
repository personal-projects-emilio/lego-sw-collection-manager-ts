export interface Set {
  id: string
  name: string
  subtheme: string
  characterNames: string[]
  tags: string[]
  releaseYear: number
  location: string
  note: null | string
  ownedQty: number
  content: {
    minifigs:
      | Array<{
          id: string
          quantity: number
        }>
      | number
    box: null | boolean
    notice: null | boolean
    bags: null | boolean
    partsQty: null | number
  }
  prices: {
    bought: number | 'Gift' | string
    storeValueFR: number | 'polybag' | string
    marketValue: number
  }
}

export type SetsList = Set[]

export type SetsFilters = {
  subtheme: string | null
  tag: string | null
  search: string | null
  noLocation: boolean | null
}
