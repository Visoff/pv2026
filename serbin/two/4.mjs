/**
    * @param {{name: string, age: number}[]} list
    * @return {string | null}
*/
export default function (list) {
    /*
        На входе: массив объектов вида { name, age }
        На выходе: имя ПЕРВОГО человека, чей возраст >= 18, либо null, если такого нет
    */
    const L = list.find(i => i.age >= 18);
    return L ? L.name : null;
}
