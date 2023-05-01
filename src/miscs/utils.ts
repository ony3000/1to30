export function shuffle<T>(collection: T[]): T[] {
  if (collection.length <= 1) {
    return collection;
  }

  const shuffledIndexes = [...Array(collection.length)]
    .map((_, index) => ({ index, key: Math.random() }))
    .sort((former, latter) => former.key - latter.key)
    .map(({ index }) => index);

  return collection.map((_, index) => collection[shuffledIndexes[index]]);
}
