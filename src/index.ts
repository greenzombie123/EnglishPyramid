import "./style.css";
import "normalize.css";
import controller from "./controller";
import getPicture from "./pictureManager"

console.log(getPicture("dog"))

// const context = require.context('./assets', false, /.png$/)

// console.log(context.keys())

// const h = document.querySelector("img")

// h.src = context(context.keys()[0])

// console.log(context(context.keys()[0]))
