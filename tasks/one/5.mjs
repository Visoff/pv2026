/**
    * @param {any[]} list
    * @return {number}
*/
export default function (list) {
    /*
        На входе: массив чего угодно
        На выходе: сумма всех чисел из массива
        Задача: найти только числа и просуммировать
    */
   let sum = 0;
   for (const x of list) {
    if (typeof x==="number") {
        sum += x
    }
   }
   return sum;
}
