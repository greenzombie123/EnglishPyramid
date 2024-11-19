import { describe, expect, test } from "@jest/globals";
import {
  Card,
  getCard,
  getCurrentRow,
  getGuesses,
  Guesses,
  incrementCurrentRow,
  isCatCard,
  isGameOver,
  makeCard,
  NoCard,
  PictureCard,
  Pyramid,
  resetGuesses,
  updateGuesses,
} from "../src/model";

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
    firstRow: false,
    secondRow: false,
    thirdRow: false,
    fourthRow: false,
    fifthRow: false,
  };

  const results = getGuesses();

  expect(results).toEqual(expected);
});

describe("isGameOver", () => {
  test("Return false if not all row props are true", () => {
    const mock: Guesses = {
      firstRow: true,
      secondRow: false,
      thirdRow: true,
      fourthRow: true,
      fifthRow: true,
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
      firstRow: false,
      secondRow: false,
      thirdRow: false,
      fourthRow: false,
      fifthRow: false,
    };

    updateGuesses("firstRow")

    resetGuesses()

    const results = getGuesses()

    expect(expected).toEqual(results);
  });
});

describe("isCatCard", ()=>{
  test("Return true if cat card", ()=>{
    const expected = true
    const testCard:PictureCard = {type:"Picture", backSide:"cat", frontSide:"park"}
    const results = isCatCard(testCard)

    expect(results).toEqual(expected)
  })

  test("Return false if pass non-cat picture card", ()=>{
    const expected = false
    const testCard:PictureCard = {type:"Picture", backSide:"alligator", frontSide:"park"}
    const results = isCatCard(testCard)

    expect(results).toEqual(expected)
  })

  test("Return false if pass no card", ()=>{
    const expected = false
    const testCard:NoCard = {type:"No"}
    const results = isCatCard(testCard)

    expect(results).toEqual(expected)
  })
})
