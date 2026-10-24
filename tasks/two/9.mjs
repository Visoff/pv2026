/**
    * @template T
    * @param {T[]} list
    * @param {(item: T) => string} keyFn
    * @return {Object<string, T[]>}
*/
export default function (list, keyFn) {
    /*
        На входе: массив и функция, которая по элементу возвращает ключ группы
        На выходе: объект, где по каждому ключу лежит массив подходящих элементов
    */
<<<<<<< HEAD
    const result = {};
    for (const item of list) {
        const key = keyFn(item);
        result[key] = result[key] || [];
        result[key].push(item);
    }
    return result;
=======
>>>>>>> 972bc106a28858cc21ff803119d0ad2d1c4b0ffd
}
