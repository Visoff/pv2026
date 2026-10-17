/**
    * @param {number[]} list
    * @return {number[]}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: массив только чётных чисел
    */
   return list.filter(x => x%2 === 0)
}
