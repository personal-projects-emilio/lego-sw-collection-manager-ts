export const findIndexById = (
  array: Partial<{ id: string }>[] | null | undefined,
  idToFind: string
) => array?.findIndex(({ id }) => id === idToFind)
