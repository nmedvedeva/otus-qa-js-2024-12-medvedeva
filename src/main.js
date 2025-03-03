console.log('Hello!')
// Функция
function greet(name) {
  return `Hello, ${name}!`
}

// Стрелочная функция
const farewell = name => {
  return `Goodbye, ${name}!`
}
import { greet, farewell } from './modules.js'

console.log(greet('World'))
console.log(farewell('World'))
console.log('Hello!')
