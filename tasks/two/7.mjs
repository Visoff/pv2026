/**
    * @param {any[]} list
    * @return {boolean}
*/
export default function (list) {
    /*
        На входе: массив чего угодно
        На выходе: true, если в массиве есть хотя бы один повторяющийся элемент, иначе false
    */
    const acc = []
    list.forEach(item => acc[item] = (acc[item] || 0) + 1)
    if (acc != []){
        return true;
    } else {
        return false;

    }
}
