/**
    * @param {number} n
    * @return {(() => number)[]}
*/
export default function (n) {
    const list = []
    for (var i = 0; i < n; i++) {
        list.push(() => i)
    }
    return list;
}
