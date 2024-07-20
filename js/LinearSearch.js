export function linearSearch(arr, target) {
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
        iterations++;
        if (arr[i] === target) {
            return { index: i, iterations };
        }
    }
    return { index: -1, iterations };
}
