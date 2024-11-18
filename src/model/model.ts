export type Animal = "cat" | "dog" | "tiger" | "alligator" | "elephant";
export type Place = "zoo" | "park" | "school" | "library" | "supermarket";

export type PictureCard = {
  type: "Picture";
  frontSide: Place;
  backSide: Animal;
};

export type NoCard = {
  type: "No";
};

export type Card = NoCard | PictureCard;

export type Row = Card[];

export type Pyramid = {
  firstRow: [Card];
  secondRow: [Card, Card];
  thirdRow: [Card, Card, Card];
  fourthRow: [Card, Card, Card, Card];
  fifthRow: [Card, Card, Card, Card, Card];
};

// type TestablePyramid = {

// }

export type Guesses = {
  firstGuess: boolean;
  secondGuess: boolean;
  thirdGuess: boolean;
  fourthGuess: boolean;
  fifthGuess: boolean;
};

export type RowName =
  | "firstRow"
  | "secondRow"
  | "thirdRow"
  | "fourthRow"
  | "fifthRow";

export type GuessOrder =
  | "firstGuess"
  | "secondGuess"
  | "thirdGuess"
  | "fourthGuess"
  | "fifthGuess";

const makeCard = (place: Place, animal: Animal): PictureCard => ({
  type: "Picture",
  frontSide: place,
  backSide: animal,
});

const guesses: Guesses = {
  firstGuess: false,
  secondGuess: false,
  thirdGuess: false,
  fourthGuess: false,
  fifthGuess: false,
};

const pyramid: Pyramid = {
  firstRow: [makeCard("library", "cat")],
  secondRow: [makeCard("school", "elephant"), makeCard("supermarket", "cat")],
  thirdRow: [
    makeCard("zoo", "cat"),
    makeCard("park", "dog"),
    makeCard("school", "alligator"),
  ],
  fourthRow: [
    makeCard("library", "alligator"),
    makeCard("school", "dog"),
    makeCard("park", "tiger"),
    makeCard("supermarket", "cat"),
  ],
  fifthRow: [
    makeCard("supermarket", "dog"),
    makeCard("park", "cat"),
    makeCard("library", "tiger"),
    makeCard("school", "alligator"),
    makeCard("zoo", "elephant"),
  ],
};

let currentRow: RowName = "firstRow";

const pickCard = (index: number): void => {
    const guesses:Guesses = getGuesses()
    if(isGameOver(guesses))return
    const currentRow:RowName = getCurrentRow()
    const pyramid:Pyramid = getPyramid()
    const card:Card = getCard(index, currentRow, pyramid)

};

const isGameOver = (guesses: Guesses): boolean => {
  for (const guess of Object.entries(guesses)) {
    if (guess[1] === false) return false;
  }
  return true;
};

const getCurrentRow = (): RowName => currentRow;

const getGuesses = (): Guesses => guesses;

const getPyramid = (): Pyramid => pyramid;

const getCard = (index: number, row: RowName, pyramid: Pyramid): Card => {
  return pyramid[row][index] || { type: "No" };
};

const isCatCard = (card:Card):boolean => card.type !== "No" && card.backSide === "cat"

const updateGuesses = (GuessOrder: GuessOrder) => (guesses[GuessOrder] = true);

const incrementCurrentRow = () => {
  currentRow =
    currentRow === "firstRow"
      ? "secondRow"
      : currentRow === "secondRow"
        ? "thirdRow"
        : currentRow === "thirdRow"
          ? "fourthRow"
          : "fifthRow";
};

const resetGuesses = () => {
    guesses.firstGuess = false
    guesses.secondGuess = false
    guesses.thirdGuess = false
    guesses.fourthGuess = false
    guesses.fifthGuess = false
};

const resetCurrentRow = () => currentRow = "firstRow"

export {
  makeCard,
  isGameOver,
  getCard,
  getCurrentRow,
  getGuesses,
  getPyramid,
  updateGuesses,
  incrementCurrentRow,
  resetCurrentRow,
  resetGuesses,
  isCatCard
};
