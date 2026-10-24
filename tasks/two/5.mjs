/**
    * @param {number[]} list
    * @return {number[]}
*/
export default function (list) {
    /*
        На входе: массив чисел
        На выходе: НОВЫЙ массив, отсортированный по возрастанию
    */
    const list1 = [...list];
    
    return list1.sort((a, b) => a - b);
}
