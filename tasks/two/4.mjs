/**
    * @param {{name: string, age: number}[]} list
    * @return {string | null}
*/
export default function (list) {
    return list.find(obj => obj.age >= 18)?.name ?? null;
}
