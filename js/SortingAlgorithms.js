export function bubbleSort(arr) {
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            iterations++;
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return { sortedData: arr, iterations };
}

export function mergeSort(arr) {
    let iterations = 0;

    function merge(left, right) {
        let result = [], leftIndex = 0, rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            iterations++;
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    function divide(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = divide(arr.slice(0, mid));
        const right = divide(arr.slice(mid));
        return merge(left, right);
    }

    const sortedData = divide(arr);
    return { sortedData, iterations };
}

export function radixSort(arr) {
    let iterations = 0;

    function getMax(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    function countingSort(arr, exp) {
        let output = new Array(arr.length);
        let count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            iterations++;
            let index = Math.floor(arr[i] / exp) % 10;
            count[index]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            let index = Math.floor(arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    }

    let max = getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
    }

    return { sortedData: arr, iterations };
}
