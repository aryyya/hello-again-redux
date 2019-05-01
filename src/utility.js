const getIdGenerator = () => {
  let id = 0
  return () => id++
}
export const getId = getIdGenerator()
