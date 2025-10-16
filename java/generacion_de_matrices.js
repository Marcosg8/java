/**
 * Muestra la matriz en la consola con formato de cuadrícula.
 * @param {number[][]} matriz La matriz a imprimir.
 */
function imprimirMatriz(matriz) {
    if (matriz.length === 0) {
        console.log("La matriz está vacía.");
        return;
    }

    // 1. Encontrar el número de dígitos del número más grande (n*n) para alinear
    const n = matriz.length;
    const maxVal = n * n;
    const padding = String(maxVal).length + 1; // Espacios + 1 para separación

    // 2. Imprimir cada fila
    for (const fila of matriz) {
        let linea = "[";
        for (const celda of fila) {
            // Rellena el número con espacios a la izquierda para la alineación
            const numStr = String(celda).padStart(padding, ' ');
            linea += numStr;
        }
        linea += " ]";
        console.log(linea);
    }
}

/**
 * Genera una matriz cuadrada de tamaño n x n llena en espiral.
 * @param {number} n El tamaño de la matriz. Por defecto es 5.
 * @returns {number[][]} La matriz n x n llena en espiral.
 */
function generarMatrizEspiral(n = 5) {
    if (n <= 0) return [];
    
    // Inicialización y lógica de la espiral (sin cambios)
    const matriz = Array(n).fill(0).map(() => Array(n).fill(0));
    let valorActual = 1;
    const valorMaximo = n * n;
    let filaInicio = 0;
    let filaFin = n - 1;
    let colInicio = 0;
    let colFin = n - 1;

    while (valorActual <= valorMaximo) {
        
        // A. Izquierda a Derecha
        for (let j = colInicio; j <= colFin; j++) {
            matriz[filaInicio][j] = valorActual++;
        }
        filaInicio++;

        if (valorActual > valorMaximo) break;

        // B. Arriba a Abajo
        for (let i = filaInicio; i <= filaFin; i++) {
            matriz[i][colFin] = valorActual++;
        }
        colFin--;

        if (valorActual > valorMaximo) break;

        // C. Derecha a Izquierda
        if (filaInicio <= filaFin) {
            for (let j = colFin; j >= colInicio; j--) {
                matriz[filaFin][j] = valorActual++;
            }
            filaFin--;
        }

        if (valorActual > valorMaximo) break;

        // D. Abajo a Arriba
        if (colInicio <= colFin) {
            for (let i = filaFin; i >= filaInicio; i--) {
                matriz[i][colInicio] = valorActual++;
            }
            colInicio++;
        }
    }

    return matriz;
}