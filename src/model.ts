import { eventEmitter } from "eventlistenerhelper";

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
  firstRow: [PictureCard];
  secondRow: [PictureCard, PictureCard];
  thirdRow: [PictureCard, PictureCard, PictureCard];
  fourthRow: [PictureCard, PictureCard, PictureCard, PictureCard];
  fifthRow: [PictureCard, PictureCard, PictureCard, PictureCard, PictureCard];
};

export type Guesses = {
  firstRow: boolean;
  secondRow: boolean;
  thirdRow: boolean;
  fourthRow: boolean;
  fifthRow: boolean;
};

export type RowName =
  | "firstRow"
  | "secondRow"
  | "thirdRow"
  | "fourthRow"
  | "fifthRow";

const makeCard = (place: Place, animal: Animal): PictureCard => ({
  type: "Picture",
  frontSide: place,
  backSide: animal,
});

const guesses: Guesses = {
  firstRow: false,
  secondRow: false,
  thirdRow: false,
  fourthRow: false,
  fifthRow: false,
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
  const guesses: Guesses = getGuesses();
  if (isGameOver(guesses)) return;
  const currentRow: RowName = getCurrentRow();
  const pyramid: Pyramid = getPyramid();
  const card: Card = getCard(index, currentRow, pyramid);
  checkCard(card);
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

const isCatCard = (card: Card): boolean =>
  card.type !== "No" && card.backSide === "cat";

const checkCard = (card: Card) => {
  eventEmitter.emitEvent("flipCard", card);
  if (isCatCard(card)) {
    if (getCurrentRow() === "fifthRow") {
      eventEmitter.emitEvent("gameOver", getCurrentRow);
      return;
    } else {
      const currentRow = getCurrentRow();
      updateGuesses(currentRow);
      incrementCurrentRow();
    }
  } else {
    resetGuesses();
    resetCurrentRow();
    eventEmitter.emitEvent("wrongClick");
  }
};

const updateGuesses = (row: RowName) => (guesses[row] = true);

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
  guesses.firstRow = false;
  guesses.secondRow = false;
  guesses.thirdRow = false;
  guesses.fifthRow = false;
  guesses.fifthRow = false;
};

const resetCurrentRow = () => (currentRow = "firstRow");

const resetGame = () => {
  resetGuesses();
  resetCurrentRow();
};

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
  isCatCard,
  pickCard,
  resetGame,
};
