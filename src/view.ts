import { PictureCard, Pyramid } from "./model";

interface CardView {
  flip: () => void;
  reset: () => void;
}

interface CardViewFactory {
  (card: PictureCard, cardElement: HTMLDivElement): CardView;
}

const pyramidView = (pyramid: Pyramid) => {
  const cardDivs = Array.from(
    document.querySelectorAll(".card"),
  ) as HTMLDivElement[];

  const render = () => {};

  const createCards = (
    pyramidData: Pyramid,
    div: HTMLDivElement[],
  ): CardView[] => {};

  const cardViewList = createCards(pyramid, cardDivs);

  return { render };
};

const cardView: CardViewFactory = (
  card: PictureCard,
  cardDiv: HTMLDivElement,
  getPicture: (name: string) => string,
): CardView => {
  const backSide = cardDiv.querySelector(".back") as HTMLImageElement;
  backSide.src = getPicture(card.backSide);

  const frontSide = cardDiv.querySelector(".front") as HTMLImageElement;
  frontSide.src = getPicture(card.frontSide);

  const inner = cardDiv.querySelector(".inner") as HTMLDivElement;

  const flip = () => {inner.classList.add("flip")};
  const reset = () => {inner.classList.remove("flip")};

  return { flip, reset };
};

const getURLString = (text: string): URL => {};
