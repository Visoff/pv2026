/**
    * @param {number[]} list
    * @return {number[]}
*/
export default function (list) {
    // Я хочу вернуть массив с каждым элементом умноженным на 2
    for (let i=0; i<list.length; i++){
        list[i]*=2;
    }
    return list;
}