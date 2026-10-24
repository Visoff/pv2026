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
   let a = 0;
   for (let i=0; i<list.length; i++) {
     if (typeof list[i] === 'number') {
        a += list[i]
     }
   }
   return a
}