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
    return list.reduce((a, obj) => {
        if(!a[keyFn(obj)]) a[keyFn(obj)] = [];
        a[keyFn(obj)].push(obj);
        return a;
    }, {})
}
