import {describe, expect, test} from '@jest/globals';
import {Card, makeCard } from '../src/model/model';

test("Return a card", ()=>{
    const expectedCard:Card = {frontSide:"library", backSide:"cat"}
    const results = makeCard("library", "cat")

    expect(results).toEqual(expectedCard)
})