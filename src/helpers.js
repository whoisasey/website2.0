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

export const getNextPost = (array, current) => {
  if (array[current + 1] === undefined) {
    return array[0]
  } else return array[current + 1]
}

export const getPrevPost = (array, current) => {
  const lastPost = array[array.length - 1]

  // if index = 0, go to last node
  if (current === 0) {
    return lastPost
    // else, return nodes[-1]
  } else return array[current - 1]
}
