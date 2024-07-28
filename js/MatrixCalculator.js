class Matrix {
    constructor(rows, cols, index, mStr) {
        this.rows = rows;
        this.cols = cols;
        this.index = index;
        this.mStr = mStr;
    }

    getIndex() { return this.index; }
    getRows() { return this.rows; }
    getCols() { return this.cols; }

    getValuesFromMatrix() {
        let values = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            values[i] = new Array(this.cols).fill('');
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cell = document.getElementById(`cell${i}${j}${this.index}`);
                values[i][j] = cell.value;
            }
        }
        return values;
    }

    printMatrix() {
        this.mStr = '';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.mStr += `<input id="cell${i}${j}${this.index}" class="cell" value="">`;
            }
            this.mStr += `<br>`;
        }
        return this.mStr;
    }
    printMatrixWithValues(values) {
        this.mStr = '';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const value = values[i][j] !== undefined ? values[i][j] : '';
                this.mStr += `<input id="cell${i}${j}${this.index}" class="cell" value="${value}">`;
            }
            this.mStr += `<br>`;
        }
        return this.mStr;
    }


    addRow() {
        if (this.checkIfCanModMatrix(this.rows + 1, this.cols)) {
            this.rows += 1;
        }
        return this.printMatrix();
    }

    subRow() {
        if (this.checkIfCanModMatrix(this.rows - 1, this.cols)) {
            this.rows -= 1;
        }
        return this.printMatrix();
    }

    addCol() {
        if (this.checkIfCanModMatrix(this.rows, this.cols + 1)) {
            this.cols += 1;
        }
        return this.printMatrix();
    }

    subCol() {
        if (this.checkIfCanModMatrix(this.rows, this.cols - 1)) {
            this.cols -= 1;
        }
        return this.printMatrix();
    }

    addRowAndCol() {
        if (this.checkIfCanModMatrix(this.rows + 1, this.cols + 1)) {
            this.rows += 1;
            this.cols += 1;
        }
        return this.printMatrix();
    }

    checkIfCanModMatrix(newRows, newCols) {
        return newCols > 0 && newCols <= 10 && newRows > 0 && newRows <= 10;
    }
}

const firstMatrix = document.getElementById('first');
const secondMatrix = document.getElementById('second');
const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const multiplyButton = document.getElementById('multiply');

let matrix1 = new Matrix(3, 3, 1, '');
let matrix2 = new Matrix(3, 3, 2, '');

firstMatrix.innerHTML = matrix1.printMatrix();
secondMatrix.innerHTML = matrix2.printMatrix();
panel1.innerHTML = printControlPanel(1);
panel2.innerHTML = printControlPanel(2);

addButtonEvents(matrix1);
addButtonEvents(matrix2);

multiplyButton.addEventListener('click', () => {
    console.log(matrix1.getValuesFromMatrix());

    const matrixA = matrix1.getValuesFromMatrix();
    const matrixB = matrix2.getValuesFromMatrix();

    try {
        validateAndConvertMatrix(matrixA);
        validateAndConvertMatrix(matrixB);
    } catch (error) {
        alert(error.message);
        return;
    }

    console.log(matrixA);
    console.log(matrixB);
    let result;
    if (canMultiply(matrixA, matrixB)) {
        result = multiply(matrixA, matrixB);
        console.log(result);
    } else {
        alert("The matrices cannot be multiplied due to incompatible dimensions.");
    }
    const resMatrix = new Matrix(result[0].length,result.length,3,'');
    const resMatrixPrint = resMatrix.printMatrixWithValues(result);
    const resCont = document.getElementById('res-container');
    resCont.innerHTML = resMatrixPrint;
});

function isNumeric(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

function validateAndConvertMatrix(matrix) {
    matrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value === null || value === '') {
                matrix[rowIndex][colIndex] = 0;
            } else if (!isNumeric(value)) {
                throw new Error(`Invalid input at row ${rowIndex + 1}, column ${colIndex + 1}: Only numeric values are allowed.`);
            } else {
                matrix[rowIndex][colIndex] = parseFloat(value);
            }
        });
    });
}

function addButtonEvents(matrix) {
    const addRowButton = document.getElementById(`addRow${matrix.getIndex()}`);
    const addColumnButton = document.getElementById(`addColumn${matrix.getIndex()}`);
    const subRowButton = document.getElementById(`subRow${matrix.getIndex()}`);
    const subColumnButton = document.getElementById(`subColumn${matrix.getIndex()}`);

    addRowButton.addEventListener('click', () => {
        if (matrix.getIndex() === 1) {
            firstMatrix.innerHTML = matrix.addRow();
        } else {
            secondMatrix.innerHTML = matrix.addRow();
        }
    });

    addColumnButton.addEventListener('click', () => {
        if (matrix.getIndex() === 1) {
            firstMatrix.innerHTML = matrix.addCol();
        } else {
            secondMatrix.innerHTML = matrix.addCol();
        }
    });

    subRowButton.addEventListener('click', () => {
        if (matrix.getIndex() === 1) {
            firstMatrix.innerHTML = matrix.subRow();
        } else {
            secondMatrix.innerHTML = matrix.subRow();
        }
    });

    subColumnButton.addEventListener('click', () => {
        if (matrix.getIndex() === 1) {
            firstMatrix.innerHTML = matrix.subCol();
        } else {
            secondMatrix.innerHTML = matrix.subCol();
        }
    });
}

function printControlPanel(mIndex) {
    return `
    <div id="modRow${mIndex}">
        <h3>Row:</h3>
        <button type="button" id="addRow${mIndex}">+</button>
        <button type="button" id="subRow${mIndex}">-</button>
    </div>
    <div id="modCol${mIndex}">
        <h3>Column:</h3>
        <button type="button" id="addColumn${mIndex}">+</button>
        <button type="button" id="subColumn${mIndex}">-</button>
    </div>
    `;
}

function canMultiply(matrixA, matrixB) {
    return matrixA[0].length === matrixB.length;
}

function multiply(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    let result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
        result[i] = new Array(colsB).fill(0);
    }

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return result;
}
