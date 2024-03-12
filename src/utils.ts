import type { PrizeConfig } from './types'

export function getStrArray(str: string, len: number) {
  const arr = []
  while (str !== '') {
    let text = str.substr(0, len)
    if (str.charAt(len) !== '' && str.charAt(len) !== ' ') {
      const index = text.lastIndexOf(' ')
      if (index !== -1) text = text.substr(0, index)
    }
    str = str.replace(text, '').trim()
    arr.push(text)
  }
  return arr
}

export function pickRandomItemWithProbability(items: PrizeConfig[]): PrizeConfig | null {
  // Calculate the total sum of probabilities
  const totalProbability = items.reduce((sum, item) => sum + parseInt(item.probability), 0)

  // Select a random threshold
  const threshold = Math.random() * totalProbability

  // Iterate through the array to find where the cumulative sum
  // reaches or exceeds the threshold
  let cumulativeProbability = 0
  for (const item of items) {
    cumulativeProbability += item.probability
    if (cumulativeProbability >= threshold) {
      // Return the selected item
      return item
    }
  }

  // Fallback, in case no item is selected (shouldn't happen if probabilities are correctly set)
  return null
}
