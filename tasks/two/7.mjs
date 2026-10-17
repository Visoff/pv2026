/**
    * @param {any[]} list
    * @return {boolean}
*/
export default function (list) {
    /*
        На входе: массив чего угодно
        На выходе: true, если в массиве есть хотя бы один повторяющийся элемент, иначе false
    */
    return (new Set(list)).size === list.length;
}
