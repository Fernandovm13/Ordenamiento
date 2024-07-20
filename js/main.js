import { ArrayModel } from './ArrayModel.js';
import { LinkedList } from './LinkedListModel.js';
import { bubbleSort, mergeSort, radixSort } from './SortingAlgorithms.js';
import { linearSearch } from './LinearSearch.js';

document.addEventListener('DOMContentLoaded', () => {
    let data = [];
    const businessList = document.getElementById("list-business");
    const ctxInsertion = document.getElementById('insertion-chart').getContext('2d');
    const ctxSorting = document.getElementById('sorting-chart').getContext('2d');
    const ctxSearch = document.getElementById('search-chart').getContext('2d');
    let insertionChart = null;
    let sortingChart = null;
    let searchChart = null;

    document.getElementById('load-data').addEventListener('click', () => {
        fetch('./business.json')
            .then(response => response.json())
            .then(json => {
                data = json;
                displayData(data);
            })
            .catch(err => console.log(err));
    });

    document.getElementById('analyze-insertion').addEventListener('click', () => {
        analyzeInsertion(data);
    });

    document.getElementById('analyze-sorting').addEventListener('click', () => {
        analyzeSorting(data);
    });

    document.getElementById('analyze-search').addEventListener('click', () => {
        analyzeSearch(data);
    });

    function displayData(data) {
        businessList.innerHTML = '';
        data.slice(0, 100).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            businessList.appendChild(li);
        });
    }

    function analyzeInsertion(data) {
        const arrayData = data.slice(0, 100);
        const startTimeArray = performance.now();
        const arrayModel = ArrayModel.fromJSON(arrayData);
        const endTimeArray = performance.now();
        const timeTakenArray = (endTimeArray - startTimeArray) * 1000; 

        const startTimeLinked = performance.now();
        const linkedListModel = LinkedList.fromJSON(arrayData);
        const endTimeLinked = performance.now();
        const timeTakenLinked = (endTimeLinked - startTimeLinked) * 1000; 

        if (insertionChart) {
            insertionChart.destroy();
        }

        insertionChart = new Chart(ctxInsertion, {
            type: 'bar',
            data: {
                labels: ['ArrayList', 'LinkedList'],
                datasets: [{
                    label: 'Tiempo de Inserción (µs)',
                    data: [timeTakenArray, timeTakenLinked],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function analyzeSorting(data) {
        const arrayData = data.slice(0, 100).map(item => item.id);

        const { timeTaken: bubbleArrayTime } = measureSortTime(bubbleSort, arrayData.slice());
        const { timeTaken: bubbleLinkedTime } = measureSortTime(bubbleSort, arrayData.slice());

        const { timeTaken: mergeArrayTime } = measureSortTime(mergeSort, arrayData.slice());
        const { timeTaken: mergeLinkedTime } = measureSortTime(mergeSort, arrayData.slice());

        const { timeTaken: radixArrayTime } = measureSortTime(radixSort, arrayData.slice());
        const { timeTaken: radixLinkedTime } = measureSortTime(radixSort, arrayData.slice());

        if (sortingChart) {
            sortingChart.destroy();
        }

        sortingChart = new Chart(ctxSorting, {
            type: 'bar',
            data: {
                labels: ['Bubble Sort', 'Merge Sort', 'Radix Sort'],
                datasets: [
                    {
                        label: 'ArrayList',
                        data: [bubbleArrayTime, mergeArrayTime, radixArrayTime],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'LinkedList',
                        data: [bubbleLinkedTime, mergeLinkedTime, radixLinkedTime],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function analyzeSearch(data) {
        const arrayData = data.slice(0, 100).map(item => item.id);
        const target = arrayData[Math.floor(Math.random() * arrayData.length)];

        const { timeTaken: timeTakenArray } = measureSearchTime(linearSearch, arrayData, target);
        const { timeTaken: timeTakenLinked } = measureSearchTime(linearSearch, arrayData, target);

        if (searchChart) {
            searchChart.destroy();
        }

        searchChart = new Chart(ctxSearch, {
            type: 'bar',
            data: {
                labels: ['ArrayList', 'LinkedList'],
                datasets: [{
                    label: 'Tiempo de Búsqueda Lineal (µs)',
                    data: [timeTakenArray, timeTakenLinked],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function measureSortTime(sortFunction, data) {
        const startTime = performance.now();
        const { sortedData, iterations } = sortFunction(data);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime) * 1000; // Convert to microseconds
        return { timeTaken, iterations };
    }

    function measureSearchTime(searchFunction, data, target) {
        const startTime = performance.now();
        const { index, iterations } = searchFunction(data, target);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime) * 1000; // Convert to microseconds
        return { timeTaken, iterations };
    }
});
