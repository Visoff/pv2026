/**
    * @param {number} n
    * @return {(number | "fizz" | "buzz" | "fizzbuzz")[]}
*/
export default function (n) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        let val;
        if(i % 3 === 0 && i % 5 === 0) val = "fizzbuzz";
        else if(i % 3 === 0) val = "fizz";
        else if(i % 5 === 0) val = "buzz";
        else val = i;

        arr.push(val);
    }

    return arr;

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
}
