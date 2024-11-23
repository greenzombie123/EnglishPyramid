import { CardView, createPyramidView } from "./view";
import * as model from "./model";

const controller = () => {
  const pyramid: model.Pyramid = model.getPyramid();
  const pyramidView = createPyramidView(pyramid);

  const handleCardClick = (row:model.RowName, index:number) => () => {
    const currentRow = model.getCurrentRow()
    if(currentRow === row) model.pickCard(index)
  };

  const handleRestartClick = () => {};

  const handleFlipCard = ()=> {}

  const handleResetCards = ()=>{}

  const init = () => {
    const cardViewList = pyramidView.getCardViewList()
    // cardViewList.map(cardView=>)

  };

  return { init };
};

export default controller();
