/**
    * @param {{name: string, age: number}[]} list
    * @return {string | null}
*/
export default function (list) {
        const result = list.find ((item) => item.age >= 18)
        return result ? result.name : null
}
