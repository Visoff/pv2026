/**
    * @template T
    * @param {T => T} f
    * @return {T => T}
*/
export default function (f) {
    return function(x) {
        return f(f(x));
    }
}
