/**
    * @param {number[]} list
    * @return {number}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: сумма квадратов всех чётных чисел
    */
    list = list.filter(num => num % 2 === 0);
    list = list.map(num => num * num);
    list = list.reduce((sum, current) => sum + current, 0);
    return list;
}
