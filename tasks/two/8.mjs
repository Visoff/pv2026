/**
    * @param {number[]} list
    * @return {number}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: сумма квадратов всех чётных чисел
    */
    return list.filter(obj => obj % 2 === 0).reduce((a ,b) => a + b*b, 0);
}
