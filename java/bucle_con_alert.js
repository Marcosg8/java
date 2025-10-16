function valores() {
    alert("El número de argumentos es " + arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        alert("Argumento " + i + " = " + arguments[i]);
    }
}

valores(4, 6, 8, 2, 7, 5);