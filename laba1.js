/*
Лабораторная работа #1
Предмет: модели решения задач в интеллектуальных системах
Выполнил студент группы 921703
Кравцов Михаил Сергеевич

Вариант 9 - алгоритм вычисления произведения пары 6-разрядных чисел
умножением со старших разрядов со сдвигом множимого (частичного произведения) вправо;

Использованные источники:
https://learn.javascript.ru/
https://github.com/Pazhiloipavuk/MRZvIS (некоторые методы построения взяты из данного репозитория)
*/

var secondElemArray;
var firstElemArray;
var resultArray;
var timeInt;
var digitCapacity = 6;
var vectorsLength;

var table;

function main() {

    table = document.getElementById('Table');

    readInput();

    if(isDataIncorrect()){
        return;
    }


    table.innerHTML = "";

    table.insertRow(-1);

    table.rows[0].insertCell(-1);
    table.rows[0].cells[0].innerText = "Пара/действие";

    for (var cellCounter = 1; cellCounter <= digitCapacity; cellCounter++) {

        var currentCell = table.rows[0].insertCell(-1);

        currentCell.innerHTML = "Произведение A*B<sub>" + (digitCapacity - cellCounter) +"</sub><br>Этап " + cellCounter;
    }

    fillTable();

    document.getElementById('ResultMassage').innerHTML = "Результат: " + resultArray + ";</br>Ку = " + (vectorsLength * digitCapacity) / (vectorsLength + digitCapacity - 1)
                                                        + ";</br>e = " + (vectorsLength * digitCapacity) / (vectorsLength + digitCapacity - 1) / digitCapacity + ";</br>";

}

function isDataIncorrect(){
    if(timeInt.length != 1 || !timeInt[0].match(/^\d+$/) || timeInt[0] <= 0){
        alert("Ошибка! Время должно задаваться положительным целочисленным параметром.");
        return true;
    }

    if (firstElemArray.length != secondElemArray.length){
        alert("Ошибка! Количество элементов первого и второго вектора должно совпадать.");
        return true;
    }

    vectorsLength = firstElemArray.length;

    for (var index = 0; index < vectorsLength; index++){
        if (!firstElemArray[index].match(/^\d+$/) || !secondElemArray[index].match(/^\d+$/)
            || firstElemArray[index] > 63 || firstElemArray[index] <= 0
            || secondElemArray[index] > 63 || secondElemArray[index] <= 0){
            alert("Ошибка! Вектора чисел могут содержать значения от 1 до 63. Вектор не должен содержать пробелов! Все данные вводятся через запятую!");
            return true;
        }
        firstElemArray[index] = parseInt(firstElemArray[index]).toString(2);
        secondElemArray[index] = parseInt(secondElemArray[index]).toString(2);
    }

    return false;
}

function readInput() {

    document.getElementById('ResultMassage').innerHTML = "";

    secondElemArray = [];
    firstElemArray = [];

    firstElemArray = document.getElementById('InputPairFirstElem').value.split(',');
    secondElemArray = document.getElementById('InputPairSecondElem').value.split(',');
    timeInt = document.getElementById('Time').value.split(',');
}

function fillTable() {

    var bit;
    var partialСomposition;

    var stageArr = new Array(vectorsLength);
    var partialSum = new Array(vectorsLength);

    resultArray = new Array(vectorsLength);

    for (var k = 0; k < vectorsLength; k++) {
        stageArr[k] = 1 - k;
        partialSum[k] = "000000000000";
    }

    for (var i = 1; i < vectorsLength + digitCapacity; i++) {
        var row = table.insertRow(-1);
        var currentCell = row.insertCell(-1);

        if(i <= vectorsLength){
            currentCell.innerHTML = "A: " + addZeros(firstElemArray[i - 1].toString(2),digitCapacity) + "</br>" +
            "B: " + addZeros(secondElemArray[i - 1].toString(2),digitCapacity) + "</br>" +
            "Сумма: </br>" + addHyphen(addZeros(partialSum[i - 1], digitCapacity * 2));
        }

        for (var j = 1; j <= digitCapacity; j++) {
            currentCell = row.insertCell(-1);

            if (i < j){
                continue;
            }

            for (var k = 0; k < vectorsLength; k++) {

                if (stageArr[k] != j){
                    continue;
                }

                bit = addZeros(secondElemArray[k], digitCapacity)[j - 1];
                partialСomposition = parseInt(addZerosLeft(addZerosRight(firstElemArray[k], (digitCapacity - j)), j), 2) * parseInt(bit, 2);

                partialSum[k] = (parseInt(partialSum[k], 2) + partialСomposition).toString(2);


                currentCell.innerHTML =
                    "B<sub>" + (digitCapacity - j) + "</sub>:" + bit + "</br>" +
                    "Частичное произведение: </br>" + addHyphen(addZeros(partialСomposition.toString(2),digitCapacity*2)) + "</br>" +
                    "Частичная сумма:  </br>" +
                    addHyphen(addZeros(partialSum[k],digitCapacity*2)) + "</br>" +
                    "Время: " + timeInt * i + "</br>";

                if(j == digitCapacity){
                    resultArray[k] = parseInt(partialSum[k],2).toString(10);
                }
            }
        }

        for (var k = 0; k < vectorsLength; k++){
            stageArr[k]++;
        }
    }
}

function addZeros(array, number) {
    var numberOfZeros = number - array.length;

    for (var i = 0; i < numberOfZeros; i++){
        array = "0" + array;
    }
    return array;
}

function addZerosRight(binString, numberOfZeros) {
    for (var i = 0; i < numberOfZeros; i++){
        binString = binString + "0";
    }
    return binString;
}

function addZerosLeft(binString, numberOfZeros) {
    for (var i = 0; i < numberOfZeros; i++){
        binString = "0" + binString;
    }
    return binString;
}

function addHyphen(binString){
    return binString.substr(0, digitCapacity) + "-" + binString.substr(digitCapacity);
}