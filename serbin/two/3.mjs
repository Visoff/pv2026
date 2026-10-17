/**
    * @param {any[]} list
    * @return {Object<string, number>}
*/
export default function (list) {
    /*
        На входе: массив чего угодно
        На выходе: объект, где ключ — элемент массива, значение — сколько раз он встретился
    */
   return list.reduce((a, i) => {
        a[i] = (a[i] || 0) + 1;
        return a;
    }, {});
}
