/**
 * 
 * @param {string} input  
 * @param {number} shift 
 */
function caeser(input, shift) {

    const newMap = input.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            return String.fromCharCode(char.charCodeAt(0)+shift%26)
        } else {
            return char
        }

    })
    return newMap.join('');
}
module.exports = caeser