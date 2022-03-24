export const sortedNodes = array =>
  array
    .sort((a, b) =>
      a.databaseId > b.databaseId ? 1 : b.databaseId > a.databaseId ? -1 : 0
    )
    .reverse()

export const randomize = (array, num) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())

  return shuffled.slice(0, num)
}
