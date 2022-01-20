export const sortedNodes = array =>
  array
    .sort((a, b) =>
      a.databaseId > b.databaseId ? 1 : b.databaseId > a.databaseId ? -1 : 0
    )
    .reverse()
