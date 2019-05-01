export const getIdGenerator = () => {
  let id = 0
  return () => id++
}
