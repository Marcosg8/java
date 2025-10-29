// Ejercicio: Creación de un Prototipo "Libro" con Herencia y Análisis de Propiedades

// Parte 1: Creación del Prototipo y Objetos
function Libro(titulo, autor, añoPublicacion, genero) {
this.titulo = titulo;
this.autor = autor;
this.añoPublicacion = añoPublicacion;
this.genero = genero;
}
// Método en el prototipo
Libro.prototype.obtenerInfo = function() {
return `${this.titulo} - ${this.autor} (${this.añoPublicacion}) - ${this.genero}`;
};
// Crear instancias de Libro
const libro1 = new Libro("Cien años de soledad", "Gabriel García Márquez", 1967, "Realismo mágico");
const libro2 = new Libro("1984", "George Orwell", 1949, "Ciencia ficción");
const libro3 = new Libro("El Quijote", "Miguel de Cervantes", 1605, "Novela");
// Parte 2: Herencia de Prototipos
function LibroDigital(titulo, autor, añoPublicacion, genero, formato) {
Libro.call(this, titulo, autor, añoPublicacion, genero);
this.formato = formato;
}
// Establecer herencia prototípica
LibroDigital.prototype = Object.create(Libro.prototype);
LibroDigital.prototype.constructor = LibroDigital;
// Método específico para LibroDigital
LibroDigital.prototype.obtenerFormato = function() {
return `Formato: ${this.formato}`;
};
// Crear instancias de LibroDigital
const libroDigital1 = new LibroDigital("Harry Potter", "J.K. Rowling", 1997, "Fantasía", "EPUB");
const libroDigital2 = new LibroDigital("Dune", "Frank Herbert", 1965, "Ciencia ficción", "PDF");
// Parte 3: Función para recorrer propiedades
function mostrarPropiedades(objeto) {
console.log("=== ANÁLISIS DEL OBJETO ===");
console.log("Tipo:", objeto.constructor.name);
// 1. Propiedades enumerables (propias y heredadas)
console.log("\n1. Propiedades enumerables (propias y heredadas):");
for (let propiedad in objeto) {
if (objeto.hasOwnProperty(propiedad)) {
console.log(` - ${propiedad} (propia): ${objeto[propiedad]}`);
} else {
console.log(` - ${propiedad} (heredada)`);
}
}
// 2. Solo propiedades propias
console.log("\n2. Propiedades propias:");
const propiedadesPropias = Object.keys(objeto);
propiedadesPropias.forEach(prop => {
console.log(` - ${prop}: ${objeto[prop]}`);
});
// 3. Nombres de todas las propiedades propias (incluyendo no enumerables)
console.log("\n3. Todas las propiedades propias:");
const todasLasPropiedades = Object.getOwnPropertyNames(objeto);
todasLasPropiedades.forEach(prop => {
console.log(` - ${prop}`);
});
// 4. Métodos del prototipo
console.log("\n4. Métodos del prototipo:");
const prototipo = Object.getPrototypeOf(objeto);
const metodosPrototipo = Object.getOwnPropertyNames(prototipo);
metodosPrototipo.forEach(metodo => {
if (typeof prototipo[metodo] === 'function' && metodo !== 'constructor') {
console.log(` - ${metodo}()`);
}
});
// 5. Cadena de prototipos
console.log("\n5. Cadena de prototipos:");
let protoActual = objeto;
let nivel = 0;
while (protoActual = Object.getPrototypeOf(protoActual)) {
console.log(` Nivel ${nivel}: ${protoActual.constructor.name}`);
nivel++;
if (protoActual === Object.prototype) break;
}
}
// Parte 4: Verificación
function verificarPropiedades(objeto) {
console.log("\n=== VERIFICACIÓN DE PROPIEDADES ===");
// Verificar propiedad propia
console.log(`¿Tiene propiedad 'titulo' propia?`, objeto.hasOwnProperty('titulo'));
console.log(`¿Tiene propiedad 'formato' propia?`, objeto.hasOwnProperty('formato'));
// Verificar si existe en la cadena de prototipos (incluyendo heredadas)
console.log(`¿Existe 'obtenerInfo' en el objeto?`, 'obtenerInfo' in objeto);
console.log(`¿Existe 'obtenerFormato' en el objeto?`, 'obtenerFormato' in objeto);
console.log(`¿Existe 'toString' en el objeto?`, 'toString' in objeto);
}
// Ejecutar las funciones
console.log("=== LIBRO FÍSICO ===");
mostrarPropiedades(libro1);
verificarPropiedades(libro1);
console.log("\n" + "=".repeat(50) + "\n");
console.log("=== LIBRO DIGITAL ===");
mostrarPropiedades(libroDigital1);
verificarPropiedades(libroDigital1);
// Demostración de uso de métodos
console.log("\n=== DEMOSTRACIÓN DE MÉTODOS ===");
console.log("Libro físico:", libro1.obtenerInfo());
console.log("Libro digital:", libroDigital1.obtenerInfo());
console.log(libroDigital1.obtenerFormato());
// Ejemplo adicional: Recorrer array de objetos
console.log("\n=== TODOS LOS LIBROS CREADOS ===");
const todosLosLibros = [libro1, libro2, libro3, libroDigital1, libroDigital2];
todosLosLibros.forEach((libro, index) => {
console.log(`${index + 1}. ${libro.obtenerInfo()} ${libro.formato ? `- ${libro.formato}` : ''}`);
});