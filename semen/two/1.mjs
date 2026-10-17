/**
    * @param {number[]} list
    * @return {number[]}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: массив, где каждый элемент умножен на свой индекс
    */
   return list.map((x, i) => x*i);
}
