/**
    * @param {number[]} list
    * @return {number[]}
*/
export default function (list) {
   
   const mapped = list.map((x, index) => x * index)
   return mapped
}
