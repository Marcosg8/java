function compararValores(a, b) {
    if (a > b) {
        return `${a} es mayor que ${b}`;
    } else if (a < b) {
        return `${b} es mayor que ${a}`;
    } else if (a === b) {
        return `${a} y ${b} son iguales`;
    } else {
        return "No se pueden comparar los valores";
    }
}

// Ejemplos de uso:
console.log(compararValores(5, 3)); // 5 es mayor que 3
console.log(compararValores('5', 5)); // 5 y 5 son iguales
console.log(compararValores('abc', 'def')); // def es mayor que abc
console.log(compararValores('10', 2)); // 10 es mayor que 2
console.log(compararValores('a', 'a')); // a y a son iguales