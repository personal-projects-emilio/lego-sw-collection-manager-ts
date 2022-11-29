export const a11yTabProps = (name: string, index: any) => ({
  id: `tab-${name}-nav-${index}`,
  'aria-controls': `tab-${name}-nav-${index}`,
})
