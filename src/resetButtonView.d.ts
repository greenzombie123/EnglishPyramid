declare const createResetButton: () => {
    getButton: () => HTMLButtonElement;
    hideButton: () => void;
    revealButton: () => void;
};
export default createResetButton;
