import { PictureCard, Pyramid, RowName } from "./model";
import getPicture from "./pictureManager";

export interface CardView {
  flip: () => void;
  reset: () => void;
  getCardData: () => { frontSide: string; backSide: string; cardRow: RowName, cardIndex:number };
  getCardDiv:()=>HTMLDivElement
}

const createCardView: CardViewFactory = (
  card: PictureCard,
  cardDiv: HTMLDivElement,
  getPicture: (name: string) => string,
  row: RowName,
  index:number
): CardView => {
  const backSide: string = card.backSide;
  const frontSide: string = card.frontSide;
  const cardRow: RowName = row;
  const div = cardDiv;
  const cardIndex = index

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
  const getCardData = () => ({cardIndex, backSide, frontSide, cardRow  });
  const getCardDiv = ()=>div

  return { reset, flip, getCardData, getCardDiv };
};

interface CardViewFactory {
  (
    card: PictureCard,
    cardElement: HTMLDivElement,
    getPicture: (name: string) => string,
    row:RowName,
    index:number
  ): CardView;
}

const createPyramidView = (pyramid: Pyramid) => {
  const cardDivs = Array.from(
    document.querySelectorAll(".card"),
  ) as HTMLDivElement[];

  const pyramidDiv: { [index: string]: HTMLDivElement[] } = {};

  pyramidDiv.firstRow = [cardDivs[0]];
  pyramidDiv.secondRow = [cardDivs[1], cardDivs[2]];
  pyramidDiv.thirdRow = [cardDivs[3], cardDivs[4], cardDivs[5]];
  pyramidDiv.fourthRow = [cardDivs[6], cardDivs[7], cardDivs[8], cardDivs[9]];
  pyramidDiv.fifthRow = [
    cardDivs[10],
    cardDivs[11],
    cardDivs[12],
    cardDivs[13],
    cardDivs[14],
  ];

  const createCardViewList = (): CardView[] => {
    const firstRowView = pyramidDiv.firstRow.map((cardDiv, index) =>
      createCardView(pyramid.firstRow[index], cardDiv, getPicture, "firstRow", index),
    );

    const secondRowView = pyramidDiv.secondRow.map((cardDiv, index) =>
      createCardView(pyramid.secondRow[index], cardDiv, getPicture, "secondRow", index),
    );

    const thirdRowView = pyramidDiv.thirdRow.map((cardDiv, index) =>
      createCardView(pyramid.thirdRow[index], cardDiv, getPicture, "thirdRow", index),
    );

    const fourthRowView = pyramidDiv.fourthRow.map((cardDiv, index) =>
      createCardView(pyramid.fourthRow[index], cardDiv, getPicture, "fourthRow", index),
    );

    const fifthRowView = pyramidDiv.fifthRow.map((cardDiv, index) =>
      createCardView(pyramid.fifthRow[index], cardDiv, getPicture, "fifthRow", index),
    );

    return [
      ...firstRowView,
      ...secondRowView,
      ...thirdRowView,
      ...fourthRowView,
      ...fifthRowView,
    ];
  };

  const cardViewList: CardView[] = createCardViewList();

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

  return { reset, getCardViewList, getCardView, getPyramidDiv };
};

export { createPyramidView };
