/**
    * @param {number[]} list
    * @return {number[]}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: НОВЫЙ массив, отсортированный по возрастанию
    */
    return list.toSorted((a, b) => a - b);
}
