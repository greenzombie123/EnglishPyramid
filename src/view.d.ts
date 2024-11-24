import { Pyramid, RowName } from "./model";
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
declare const createPyramidView: (pyramid: Pyramid) => {
    reset: () => void;
    getCardViewList: () => CardView[];
    getCardView: (frontSide: string, backSide: string, row: RowName) => CardView;
    getPyramidDiv: () => {
        [index: string]: HTMLDivElement[];
    };
    resetPyramidView: (newPyramid: Pyramid) => void;
};
export { createPyramidView };
