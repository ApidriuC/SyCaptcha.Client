/**
* Verifica si alguno de los elementos de un array de cadenas de texto está vacío o contiene solo espacios en blanco.
*
* @param {string[]} strings - Arreglo de cadenas de texto a verificar.
* @returns {boolean} `true` si al menos una cadena está vacía o contiene solo espacios en blanco, 
* de lo contrario, `false`.
*/
export const isEmptyStrings = (strings: string[]): boolean => {
    return strings.some(str => !str || str.trim() === '');
};