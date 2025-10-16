function calculadoraAvanzada(num1, num2) {
    let multiplication = num1 * 10;
    let addition_result = multiplication + num2;
    let is_divisible_by_3 = (addition_result % 3 === 0);
    let subtraction_result = num1 - num2;
    let is_greater_than_50 = (addition_result > 50);
    let is_divisible_by_5 = (addition_result % 5 === 0);
    let logical_result = is_greater_than_50 && is_divisible_by_5;
    return {
        resultado_suma_multiplicacion: addition_result,
        es_divisible_por_3: is_divisible_by_3,
        resultado_resta: subtraction_result,
        resultado_logico: logical_result
    };
}

const resultados = calculadoraAvanzada(6, 4);
console.log(resultados);