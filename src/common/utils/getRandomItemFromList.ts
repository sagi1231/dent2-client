export function getRandomItemsFromList<T>(keywords: T[], count = 1) {
  const shuffled = [...keywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomItemFromList<T>(keywords: T[]) {
  return getRandomItemsFromList(keywords, 1)[0];
}
