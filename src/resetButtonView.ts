const createResetButton = () => {
  const resetButton = document.querySelector(
    ".restartButton",
  ) as HTMLButtonElement;

  const hideButton = () => {
    resetButton.style.display = "none";
  };

  const revealButton = () => {
    resetButton.style.display = "block";
  };

  const getButton = () => resetButton;

  return { getButton, hideButton, revealButton };
};

export default createResetButton
