/**
    * @param {any[]} list
    * @return {number}
*/
export default function (list) {
    return list.reduce((a, obj) => (Number.isFinite(obj) ? a+obj : a))
}
