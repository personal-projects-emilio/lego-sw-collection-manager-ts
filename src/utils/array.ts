import { LabelAndAmount } from 'types/misce'

export const findIndexById = (
  array: Partial<{ id: string }>[] | null | undefined,
  idToFind: string
) => array?.findIndex(({ id }) => id === idToFind)

// type ReduceKeyValue = <T, Keys extends keyof T & string>(array: T[], keys: Keys[]) => Record<Keys,LabelAndAmount[]>

type ReduceKeyValue = <Keys extends string, T extends Record<Keys, string | string[]>>(
  array: T[],
  keys: Keys[]
) => Record<Keys, LabelAndAmount[]>

// @ts-ignore
export const reduceKeyValues: ReduceKeyValue = (array, keys) => {
  const initialState = keys.reduce<Record<typeof keys[number], LabelAndAmount[]>>(
    (acc, curr) => ({
      ...acc,
      [curr]: [],
    }), // @ts-ignore
    {}
  )
  const values = array.reduce<Record<typeof keys[number], LabelAndAmount[]>>(
    (accumulator, currentValue) => {
      keys.forEach((key) => {
        const value = currentValue[key]
        if (typeof value === 'string') {
          const currentIndex = accumulator[key].findIndex((el) => el.label === currentValue[key])
          if (currentIndex === -1) {
            accumulator[key].push({ label: value, amount: 1 })
          } else {
            // Or else we increment the amount of the existing one
            accumulator[key][currentIndex].amount++
          }
        }
        if (Array.isArray(value) && value.length) {
          value.forEach((label) => {
            const currentIndex = accumulator[key].findIndex((el) => el.label === label)
            // If it is a new tag we had it to the accumulator
            if (currentIndex === -1) {
              accumulator[key].push({ label, amount: 1 })
            } else {
              // Or else we increment the amount of the existing one
              accumulator[key][currentIndex].amount++
            }
          })
        }
      })
      keys.forEach((key) => accumulator[key].sort((a, b) => (a.label > b.label ? 1 : -1)))
      return accumulator
    }, //@ts-ignore
    initialState
  )

  return values
}
