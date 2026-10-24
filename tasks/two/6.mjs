/**
    * @param {any[]} list
    * @return {any[]}
*/
export default function (list) {
    /*
        На входе: массив чего угодно
        На выходе: НОВЫЙ массив с элементами в обратном порядке
    */
   const list1 = [...list]
    return list1.reverse();
}
