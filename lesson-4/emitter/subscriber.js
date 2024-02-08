import { MyEmitter } from "./emiter.js";

function add (a, b) {
    MyEmitter.emit('someEvent', {field: []})
    return a+b
}

const result = add(2,4)


const result1 = add(2,4)
console.log(result)
console.log(result1)