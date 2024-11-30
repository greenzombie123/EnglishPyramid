import { Animal, PictureCard, Place, Pyramid, RowName } from "./model";
import getPicture from "./pictureManager";

export interface CardView {
  flip: () => void;
  reset: () => void;
  getCardData: () => {
    frontSide: string;
    backSide: string;
    cardRow: RowName;
    cardIndex: number;
  };
  getCardDiv: () => HTMLDivElement;
}

const createCardView: CardViewFactory = (
  card: PictureCard,
  cardDiv: HTMLDivElement,
  getPicture: (name: Animal | Place) => string,
  row: RowName,
  index: number,
): CardView => {
  const backSide: string = card.backSide;
  const frontSide: string = card.frontSide;
  const cardRow: RowName = row;
  const div = cardDiv;
  const cardIndex = index;

  const backSideDiv = cardDiv.querySelector(".back") as HTMLImageElement;
  backSideDiv.src = getPicture(card.backSide);

  const frontSideDiv = cardDiv.querySelector(".front") as HTMLImageElement;
  frontSideDiv.src = getPicture(card.frontSide);

  const inner = cardDiv.querySelector(".inner") as HTMLDivElement;

  const flip = () => {
    inner.classList.add("flip");
  };
  const reset = () => {
    inner.classList.remove("flip");
  };
  const getCardData = () => ({ cardIndex, backSide, frontSide, cardRow });
  const getCardDiv = () => div;

  return { reset, flip, getCardData, getCardDiv };
};

interface CardViewFactory {
  (
    card: PictureCard,
    cardElement: HTMLDivElement,
    getPicture: (name: Animal | Place) => string,
    row: RowName,
    index: number,
  ): CardView;
}

const createPyramidView = (pyramid: Pyramid) => {
  const cardDivs: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".card"),
  ) as HTMLDivElement[];

  type PyramidDiv = {
    firstRow: HTMLDivElement[];
    secondRow: HTMLDivElement[];
    thirdRow: HTMLDivElement[];
    fourthRow: HTMLDivElement[];
    fifthRow: HTMLDivElement[];
  };

  const pyramidDiv: PyramidDiv = {
    firstRow: cardDivs.slice(0, 1),
    secondRow: cardDivs.slice(1, 3),
    thirdRow: cardDivs.slice(3, 6),
    fourthRow: cardDivs.slice(6, 10),
    fifthRow: cardDivs.slice(10),
  };

  const createCardViewList = (): CardView[] => {
    const firstRowView = pyramidDiv.firstRow.map((cardDiv, index) =>
      createCardView(
        pyramid.firstRow[0],
        cardDiv,
        getPicture,
        "firstRow",
        index,
      ),
    );

    const secondRowView = pyramidDiv.secondRow.map((cardDiv, index) =>
      createCardView(
        index === 0 ? pyramid.secondRow[0] : pyramid.secondRow[1],
        cardDiv,
        getPicture,
        "secondRow",
        index,
      ),
    );

    const thirdRowView = pyramidDiv.thirdRow.map((cardDiv, index) =>
      createCardView(
        index === 0
          ? pyramid.thirdRow[0]
          : index === 1
            ? pyramid.thirdRow[1]
            : pyramid.thirdRow[2],
        cardDiv,
        getPicture,
        "thirdRow",
        index,
      ),
    );

    const fourthRowView = pyramidDiv.fourthRow.map((cardDiv, index) =>
      createCardView(
        index === 0
          ? pyramid.fourthRow[0]
          : index === 1
            ? pyramid.fourthRow[1]
            : index === 2
              ? pyramid.fourthRow[2]
              : pyramid.fourthRow[3],
        cardDiv,
        getPicture,
        "fourthRow",
        index,
      ),
    );

    const fifthRowView = pyramidDiv.fifthRow.map((cardDiv, index) =>
      createCardView(
        index === 0
          ? pyramid.fifthRow[0]
          : index === 1
            ? pyramid.fifthRow[1]
            : index === 2
              ? pyramid.fifthRow[2]
              : index === 3
                ? pyramid.fifthRow[3]
                : pyramid.fifthRow[4],
        cardDiv,
        getPicture,
        "fifthRow",
        index,
      ),
    );

    return [
      ...firstRowView,
      ...secondRowView,
      ...thirdRowView,
      ...fourthRowView,
      ...fifthRowView,
    ];
  };

  let cardViewList: CardView[] = createCardViewList();

  const resetPyramid = (newPyramid: Pyramid) => (pyramid = newPyramid);

  const resetPyramidView = (newPyramid: Pyramid) => {
    resetPyramid(newPyramid);
    cardViewList = createCardViewList();
  };

  const reset = () => {
    cardViewList.forEach((cardView) => cardView.reset());
  };

  const getCardView = (frontSide: string, backSide: string, row: RowName) => {
    return cardViewList.find((cardView) => {
      const cardData = cardView.getCardData();
      return (
        cardData.backSide === backSide &&
        cardData.frontSide === frontSide &&
        cardData.cardRow === row
      );
    });
  };

  const getPyramidDiv = () => pyramidDiv;
  const getCardViewList = () => cardViewList;

  return {
    reset,
    getCardViewList,
    getCardView,
    getPyramidDiv,
    resetPyramidView,
  };
};

export { createPyramidView };
