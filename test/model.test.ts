import { describe, expect, test } from "@jest/globals";
import {
  Card,
  getCard,
  getCurrentRow,
  getGuesses,
  Guesses,
  incrementCurrentRow,
  isGameOver,
  makeCard,
  NoCard,
  PictureCard,
  Pyramid,
  resetGuesses,
  updateGuesses,
} from "../src/model/model";

test("Return a card", () => {
  const expectedCard: Card = {
    frontSide: "library",
    backSide: "cat",
    type: "Picture",
  };
  const results = makeCard("library", "cat");

  expect(results).toEqual(expectedCard);
});

test("Return a guesses object", () => {
  const expected: Guesses = {
    firstGuess: false,
    secondGuess: false,
    thirdGuess: false,
    fourthGuess: false,
    fifthGuess: false,
  };

  const results = getGuesses();

  expect(results).toEqual(expected);
});

describe("isGameOver", () => {
  test("Return false if not all row props are true", () => {
    const mock: Guesses = {
      firstGuess: true,
      secondGuess: false,
      thirdGuess: true,
      fourthGuess: true,
      fifthGuess: true,
    };

    const results = isGameOver(mock);

    expect(results).toEqual(false);
  });
});

describe("getCard", () => {
  const pyramid: Pyramid = {
    firstRow: [makeCard("library", "cat")],
    secondRow: [makeCard("school", "elephant"), makeCard("supermarket", "cat")],
    thirdRow: [
      makeCard("zoo", "cat"),
      makeCard("park", "dog"),
      makeCard("school", "alligator"),
    ],
    fourthRow: [
      makeCard("library", "alligator"),
      makeCard("school", "dog"),
      makeCard("park", "tiger"),
      makeCard("supermarket", "cat"),
    ],
    fifthRow: [
      makeCard("supermarket", "dog"),
      makeCard("park", "cat"),
      makeCard("library", "tiger"),
      makeCard("school", "alligator"),
      makeCard("zoo", "elephant"),
    ],
  };

  test("return a card with frontSide prop of 'supermarket' and backSide prop of 'cat'", () => {
    const expected: PictureCard = {
      frontSide: "supermarket",
      backSide: "cat",
      type: "Picture",
    };

    const results: Card = getCard(3, "fourthRow", pyramid);

    expect(results).toEqual(expected);
  });

  test("return a 'no card' because querying a card that at an nonexisted index", () => {
    const expected: NoCard = { type: "No" };

    const results: Card = getCard(5, "secondRow", pyramid);

    expect(results).toEqual(expected);
  });
});

describe("incrementCurrentRow", () => {
  test("Change to 'secondRow'", () => {
    const expected = "secondRow";
    incrementCurrentRow();
    const results = getCurrentRow();
    expect(expected).toBe(results);
  });

  test("Change to 'fifthrow'", () => {
    const expected = "fifthRow";
    incrementCurrentRow();
    incrementCurrentRow();
    incrementCurrentRow();
    incrementCurrentRow();
    const results = getCurrentRow();
    expect(expected).toBe(results);
  });
});

describe("resetGuesses", () => {
  test("Change all props to false'", () => {
    const expected: Guesses = {
      firstGuess: false,
      secondGuess: false,
      thirdGuess: false,
      fourthGuess: false,
      fifthGuess: false,
    };

    updateGuesses("firstGuess")

    resetGuesses()

    const results = getGuesses()

    expect(expected).toEqual(results);
  });
});
