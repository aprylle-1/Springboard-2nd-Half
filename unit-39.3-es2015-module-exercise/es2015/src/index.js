import fruits from './foods';
import { choice, remove } from './helpers'

let currentFruits = [...fruits]

const randomFruit = choice(currentFruits);

console.log(`I'd like one ${randomFruit}, please\n`);
console.log(`Here you go: ${randomFruit}\n`);
console.log(`Delicious! May I have another?\n`);
currentFruits = remove(currentFruits, randomFruit);
const fruitsLeft = currentFruits.length;
console.log(`I'm sorry, we're all out. We have ${fruitsLeft} left`);
