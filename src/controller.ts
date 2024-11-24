import { CardView, createPyramidView } from "./view";
import * as model from "./model";
import { eventEmitter } from "eventlistenerhelper";
import createResetButton from "./resetButtonView";

const controller = () => {
  const pyramid: model.Pyramid = model.getPyramid();
  const pyramidView = createPyramidView(pyramid);
  const resetButton = createResetButton();
  const blockedFunctions: Set<string> = new Set<string>();

  const handleCardClick = (row: model.RowName, index: number) => () => {
    if (blockedFunctions.has("cardClick")) return;
    const currentRow = model.getCurrentRow();
    if (currentRow === row) model.pickCard(index);
  };

  const handleWrongClick = () => {
    blockedFunctions.add("cardClick");
    setTimeout(() => {
      const cardViews = pyramidView.getCardViewList();
      cardViews.map((cardView) => {
        cardView.reset();
      });
      blockedFunctions.delete("cardClick");
    }, 1000);
  };

  const handleFlipCard = (card: model.PictureCard) => {
    const { frontSide, backSide } = card;
    const row = model.getCurrentRow();
    const cardView = pyramidView.getCardView(frontSide, backSide, row);
    cardView.flip();
  };

  const handleGameOver = ()=>{
    resetButton.revealButton()
  }

  const handleResetGame = () => {
    resetButton.hideButton()
    model.resetGame()
    const cardViews = pyramidView.getCardViewList();
    cardViews.map((cardView) => {
      cardView.reset();
    });
  };

  const init = () => {
    eventEmitter.subscribe("wrongClick", handleWrongClick);
    eventEmitter.subscribe("flipCard", handleFlipCard);
    eventEmitter.subscribe("gameOver", handleGameOver);
    eventEmitter.subscribe("resetGame", handleResetGame)

    // Get list of cardViews
    const cardViewList = pyramidView.getCardViewList();

    // Attach handleCardClick to the divs
    cardViewList.map((cardView) => {
      const cardDiv = cardView.getCardDiv();
      const { cardRow, cardIndex } = cardView.getCardData();

      cardDiv.addEventListener("click", handleCardClick(cardRow, cardIndex));
    });

    // Attach handleResetGame to reset button
    resetButton.getButton().addEventListener("click", handleResetGame)

  };

  return { init };
};

export default controller();
