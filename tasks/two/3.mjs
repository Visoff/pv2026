/**
    * @param {any[]} list
    * @return {Object<string, number>}
*/
export default function (list) {
    const acc = []
    list.forEach(item => acc[item] = (acc[item] || 0) + 1)
    return acc
}
