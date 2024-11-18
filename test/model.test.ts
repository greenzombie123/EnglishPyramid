import {describe, expect, test} from '@jest/globals';
import {Card, getGuesses, Guesses, makeCard } from '../src/model/model';

test("Return a card", ()=>{
    const expectedCard:Card = {frontSide:"library", backSide:"cat"}
    const results = makeCard("library", "cat")

    expect(results).toEqual(expectedCard)
})

test("Return a guesses object", ()=>{
    const expected:Guesses = {
        firstGuess: false,
        secondGuess: false,
        thirdGuess: false,
        fourthGuess: false,
        fifthGuess: false,
      };

    const results = getGuesses()

    expect(results).toEqual(expected)
})