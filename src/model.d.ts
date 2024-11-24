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
export type RowName = "firstRow" | "secondRow" | "thirdRow" | "fourthRow" | "fifthRow";
declare const makeCard: (place: Place, animal: Animal) => PictureCard;
declare const pickCard: (index: number) => void;
declare const isGameOver: (guesses: Guesses) => boolean;
declare const getCurrentRow: () => RowName;
declare const getGuesses: () => Guesses;
declare const getPyramid: () => Pyramid;
declare const getCard: (index: number, row: RowName, pyramid: Pyramid) => Card;
declare const isCatCard: (card: Card) => boolean;
declare const updateGuesses: (row: RowName) => boolean;
declare const incrementCurrentRow: () => void;
declare const resetGuesses: () => void;
declare const resetCurrentRow: () => string;
declare const resetGame: () => void;
declare const resetPyramid: () => void;
export { makeCard, isGameOver, getCard, getCurrentRow, getGuesses, getPyramid, updateGuesses, incrementCurrentRow, resetCurrentRow, resetGuesses, isCatCard, pickCard, resetGame, resetPyramid };
