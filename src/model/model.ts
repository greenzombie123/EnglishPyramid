export type Animal = "cat" | "dog" | "tiger" | "alligator" | "elephant"
export type Place = "zoo" | "park" | "school" | "library" | "supermarket"

export type Card = {
	frontSide:Place,
	backSide:Animal,
}

export type Row = Card[]

export type Pyramid = {
	firstRow:[Card],
	secondRow:[Card,Card],
	thirdRow:[Card,Card,Card],
	fourthRow:[Card,Card,Card,Card,],
	fifthRow:[Card,Card,Card,Card,Card,]
}

export type Guesses = {
	firstGuess:boolean,
	secondGuess:boolean,
	thirdGuess:boolean,
	fourthGuess:boolean,
	fifthGuess:boolean	
}

export type RowName = "firstRow"|"secondRow"|"thirdRow"|"fourthRow"| "fifthRow"

let currentRow:string

const makeCard = (place:Place,animal:Animal):Card=> ({frontSide:place,backSide:animal})

const guesses:Guesses = {
    firstGuess:false,
    secondGuess:false,
    thirdGuess:false,
    fourthGuess:false,
    fifthGuess:false
}

const pyramid:Pyramid = {
    firstRow:[makeCard("library", "cat"),],
    secondRow:[makeCard("school", "elephant"), makeCard("supermarket", "cat")],
    thirdRow:[makeCard("zoo", "cat"), makeCard("park", "dog"), makeCard("school", "alligator")],
    fourthRow:[makeCard("library", "alligator"),makeCard("school", "dog"),makeCard("park", "tiger"),makeCard("supermarket", "cat")],
    fifthRow:[makeCard("supermarket", "dog"),makeCard("park", "cat"),makeCard("library", "tiger"),makeCard("school", "alligator"),makeCard("zoo", "elephant")]
}

const pickCard = (index:number):void=>{}
const isGameOver = ():boolean=>{}
const getCurrentRow = ():RowName=>{}
const getGuesses = ():Guesses=>{}
const getPyramid = ():Pyramid=>{}
const getCard = (index:number, row:RowName, pyramid:Pyramid):Card=>{}
const checkWinner = ()=>{}
const updateGuesses = (rowName:RowName)=>{}
const incrementCurrentRow = ()=>{}
const resetGuesses =()=>{}
const reserCurrentRow =()=>{} 


export {makeCard}
