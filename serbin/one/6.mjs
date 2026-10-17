/**
    * @param {number} n
    * @return {(number | "fizz" | "buzz" | "fizzbuzz")[]}
*/
export default function (n) {
    /*
        На входе: число - длина выходного массива
        На выходе: массив, где каждый элемент зависит от позиции(начиная с 1):
        - Если позиция делится на 3, то "fizz"
        - Если позиция делится на 5, то "buzz"
        - Если позиция делится на 3 и на 5, то "fizzbuzz"
        - Иначе сама позиция

        Например:
        10 => [1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz"]
    */
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("fizzbuzz");
        } else if (i % 3 === 0) {
            result.push("fizz");
        } else if (i % 5 === 0) {
            result.push("buzz");
        } else {
            result.push(i);
        }
    }
    return result;
}
