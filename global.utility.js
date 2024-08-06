import {randomBytes} from 'crypto'

/**
 *  generate a string of random character, whose length specified by the passing argument and each character of hexdecimal system
 * @param {Number} noOfChar 
 * @returns String
 */
function generateId(noOfChar) {
    return randomBytes(noOfChar).toString('hex');
}




export {generateId,}