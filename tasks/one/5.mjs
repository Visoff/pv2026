/**
    * @param {any[]} list
    * @return {number}
*/
export default function (list) {
    let sum = 0;
    for (const item of list) {
        if (typeof item === 'number') {
            sum += item;
        }
    }
    return sum;
}
