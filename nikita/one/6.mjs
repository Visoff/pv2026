/**
    * @param {number} n
    * @return {(number | "fizz" | "buzz" | "fizzbuzz")[]}
*/
export default function (n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("fizzbuzz");
        }
        else if (i % 3 === 0) {
            result.push("fizz");
        } 
        else if (i % 5 === 0) {
            result.push("buzz");
        } 
        else {
            result.push(i);
        }
    }
    return result;
}
