/**
    * @param {any[]} list
    * @return {Object<string, number>}
*/
export default function (list) {
    return list.reduce((a, obj) => {
        a[obj] = (a[obj] || 0)+1;
        return a
    }, {});
}
