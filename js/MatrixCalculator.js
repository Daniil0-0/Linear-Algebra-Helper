class Matrix {
    constructor(rows,cols, index, mStr) {
        this.rows = rows;
        this.cols = cols;
        this.index = index;
        this.mStr = mStr;
    }
    getIndex() { return this.index; }

    getValuesFromMatrix() {
        let values = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            values[i] = new Array(this.cols).fill(0);
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cell = document.getElementById(`cell${i}${j}${this.index}`);
                values[i][j] = cell.innerText;
            }
        }
        return values;
    }

    printMatrix(){
        this.mStr = '';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.mStr += `<input id="cell${i}${j}${this.index}" class="cell">`
            }
            this.mStr += `<br>`
        }
        return this.mStr;
    }

    addRow(){
        this.rows +=1;
        return this.printMatrix();
    }
    subRow(){
        this.rows -=1;
        return this.printMatrix();
    }
    addCol(){
        this.cols +=1;
        return this.printMatrix()
    }
    subCol(){
        this.cols-=1;
        return this.printMatrix();
    }
    addRowAndCol(){
        this.rows +=1;
        this.cols +=1;
        return this.printMatrix()
    }

}


const firstMatrix = document.getElementById('first');
const secondMatrix = document.getElementById('second');
const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');


let matrix1 = new Matrix(3,3,1,'');
let matrix2 = new Matrix(3,3,2,'');

firstMatrix.innerHTML = matrix1.printMatrix()
secondMatrix.innerHTML = matrix2.printMatrix()
panel1.innerHTML = printControlPanel(1);
panel2.innerHTML = printControlPanel(2);

addButtonEvents(matrix1);
addButtonEvents(matrix2);

function addButtonEvents(matrix){
    const addRowButton = document.getElementById(`addRow${matrix.getIndex()}`)
    const addColumnButton = document.getElementById(`addColumn${matrix.getIndex()}`)
    const subRowButton = document.getElementById(`subRow${matrix.getIndex()}`)
    const subColumnButton = document.getElementById(`subColumn${matrix.getIndex()}`)
    addRowButton.addEventListener('click',()=>{
        if(matrix.getIndex()===1){
            firstMatrix.innerHTML = matrix.addRow();
        }else {
            secondMatrix.innerHTML = matrix.addRow();
        }
    });
    addColumnButton.addEventListener('click',()=>{
        if(matrix.getIndex()===1){
            firstMatrix.innerHTML = matrix.addCol();
        }else {
            secondMatrix.innerHTML = matrix.addCol();
        }
    });
    subRowButton.addEventListener('click',()=>{
        if(matrix.getIndex()===1){
            firstMatrix.innerHTML = matrix.subRow();
        }else {
            secondMatrix.innerHTML = matrix.subRow();
        }
    });
    subColumnButton.addEventListener('click',()=>{
        if(matrix.getIndex()===1){
            firstMatrix.innerHTML = matrix.subCol();
        }else {
            secondMatrix.innerHTML = matrix.subCol();
        }
    });


}

// function printMatrix(rows, cols,mStr,mIndex){
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             mStr += `<input id="cell${i}${j}${mIndex}" class="cell">`
//         }
//         mStr += `<br>`
//     }
//     return mStr;
// }
//
// function getValuesFromMatrix(rows, cols, mIndex) {
//     let values = new Array(rows);
//     for (let i = 0; i < rows; i++) {
//         values[i] = new Array(columns).fill(0);
//     }
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             let cell = document.getElementById(`cell${i}${j}${mIndex}`);
//             values[i][j] = cell.innerText;
//         }
//     }
//     return values;
// }

function printControlPanel(mIndex){
    return`
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
    `
}

