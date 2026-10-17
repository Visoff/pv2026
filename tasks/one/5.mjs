/**
    * @param {any[]} list
    * @return {number}
*/
export default function (list) {
    let ans = 0;
    list.forEach(i => {
       if(Number.isFinite(i)) ans += i;
    });

    return ans;
}
