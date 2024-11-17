import "./style.css";
import "normalize.css";

console.log("Hello World!");

const eatPizza = (food: string) => {
  return `I ate ${food}`;
};

const o = 1;

console.log(o);

const p = document.querySelector("p");

p.textContent = eatPizza("ice cream");
