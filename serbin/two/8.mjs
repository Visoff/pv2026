/**
    * @param {number[]} list
    * @return {number}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: сумма квадратов всех чётных чисел
    */
   return list
        .filter(a => a % 2 === 0)
        .map(a => a ** 2)
        .reduce((sum, a) => sum + a, 0);
}
