const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1,
  K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1
};
export const drawLetters = () => {
  // Implement this method for wave 1
  const listLetters = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      listLetters.push(letter);
    }
  }
  const hand = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * listLetters.length);
    hand.push(listLetters[randomIndex]);
    listLetters.splice(randomIndex, 1);
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  const word = input.toUpperCase();
  const lettersCopy = [...lettersInHand];
  for (const char of word) {
    const index = lettersCopy.indexOf(char);
    if (index !== -1) {
      lettersCopy.splice(index, 1);
    } else {
      return false;
    }
  }
  return true;
};

const scoreChart = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
  I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
  Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
  Y: 4, Z: 10
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  const wordUpper = word.toUpperCase();
  let point = 0;
  for (const letter of wordUpper) {
    point += scoreChart[letter] || 0;
  }
  if (wordUpper.length >= 7 && wordUpper.length <= 10) {
    point += 8;
  }
  return point;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let highestScore = 0;
  let bestWord = '';

  for (const word of words) {
    const currentScore = scoreWord(word);

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestWord = word;
    } else if (currentScore === highestScore) {
      // Tie-breaking rules
      if (bestWord.length === 10) {
        continue; // keep the existing bestWord
      } else if (word.length === 10) {
        bestWord = word; // new word wins
      } else if (word.length < bestWord.length) {
        bestWord = word; // new word wins
      }
    }
  }

  return { word: bestWord, score: highestScore };

};
