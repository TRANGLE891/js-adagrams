
export const drawLetters = () => {
  const LETTER_POOL = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1,
    K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6,
    U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1
  };
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
  const letterCount = {};
  for (const letter of lettersInHand) {
    letterCount[letter] = (letterCount[letter] ?? 0) + 1;
  }

  for (const char of input.toUpperCase()) {
    if (!letterCount[char]) {
      return false;
    }
    letterCount[char] -= 1;
  }

  return true;
};


export const scoreWord = (word) => {
  const scoreChart = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
    I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
    Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
    Y: 4, Z: 10
  };
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
  let bestWord = "";
  let highestScore = 0;

  for (const word of words) {
    const score = scoreWord(word);
    const shouldReplace =
      // Case 1: higher score always wins
      score > highestScore ||
      // Case 2: same score => apply tie-breaking rules
      (score === highestScore && (
        // 1. new word has length 10 => auto win unless old word also length 10
        (word.length === 10 && bestWord.length !== 10) ||
        // 2. neither is 10 letters => shorter word wins
        (word.length < bestWord.length && bestWord.length !== 10)
      ));

    if (shouldReplace) {
      bestWord = word;
      highestScore = score;
    }
  }

  return { word: bestWord, score: highestScore };
};
