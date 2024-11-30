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

type CardRow<T extends number> = T extends 1
  ? [PictureCard]
  : T extends 2
    ? [PictureCard, PictureCard]
    : T extends 3
      ? [PictureCard, PictureCard, PictureCard]
      : T extends 4
        ? [PictureCard, PictureCard, PictureCard, PictureCard]
        : T extends 5
          ? [PictureCard, PictureCard, PictureCard, PictureCard, PictureCard]
          : never;

const createCardRow = <T extends number>(numOfCards: T): CardRow<T> => {
  let animals: Animal[] = ["alligator", "dog", "elephant", "tiger"];
  let places: Place[] = ["library", "park", "school", "supermarket", "zoo"];
  const cards = [];

  let counter = 0;
  let hasCat = false;

  while (numOfCards > counter) {
    let ranNum = Math.floor(Math.random() * 2) + 1;

    if (hasCat) {
      ranNum = 2;
    }

    if (ranNum === 2) {
      if (numOfCards - counter === 1 && !hasCat) {
        const placeRanNum = Math.floor(Math.random() * places.length);
        cards.push({
          backSide: "cat",
          frontSide: places[placeRanNum],
          type: "Picture",
        });
      } else {
        const animalRanNum = Math.floor(Math.random() * animals.length);
        const placeRanNum = Math.floor(Math.random() * places.length);

        if(animals[animalRanNum] && places[placeRanNum]){
          cards.push({
            backSide: animals[animalRanNum],
            frontSide: places[placeRanNum],
            type: "Picture",
          })
        }
        // const card: PictureCard = {
        //   backSide: animals[animalRanNum],
        //   frontSide: places[placeRanNum],
        //   type: "Picture",
        // };

        // cards.push(card);

        animals = animals.filter((animal) => animal !== animals[animalRanNum]);
        places = places.filter((place) => place !== places[placeRanNum]);
      }
    } else {
      hasCat = true;
      const placeRanNum = Math.floor(Math.random() * places.length);
      cards.push({
        backSide: "cat",
        frontSide: places[placeRanNum],
        type: "Picture",
      });
      places = places.filter((place) => place !== places[placeRanNum]);
    }

    counter++;
  }

  return cards as CardRow<T>;
};

let pyramid: Pyramid = {
  firstRow: createCardRow(1),
  secondRow: createCardRow(2),
  thirdRow: createCardRow(3),
  fourthRow: createCardRow(4),
  fifthRow: createCardRow(5),
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
  resetPyramid()
};

const resetPyramid = ()=> {
  pyramid = {
    firstRow: createCardRow(1),
    secondRow: createCardRow(2),
    thirdRow: createCardRow(3),
    fourthRow: createCardRow(4),
    fifthRow: createCardRow(5),
  };
}

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
  resetPyramid
};
