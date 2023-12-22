import { pyodide } from "./PyLoader";
import { MatrixInvalidError } from "./MatrixErros";


class Cell {
    value: string;
    valueAsFraction: string;
    backgroundColor: string;

    constructor(value: string, backgroundColor: string = "white") {
        this.value = value;
        this.valueAsFraction =  pyodide.runPython("str(parse_expr('" + value + "', transformations=auto_number_and_ratonalize_transformation)) \n");
        this.backgroundColor = backgroundColor;
    }
}
export class Matrix {
    rowsAmount: number;
    columnsAmount: number;
    cells: Cell[][];
    type = "Matrix"
    constructor(list2D: Array<Array<string>>) {
        this.rowsAmount = list2D.length
        this.columnsAmount = list2D[0].length
        const thisLocalized = this;
        //console.log(this.rowsAmount, this.columnsAmount, thisLocalized.rowsAmount, thisLocalized.columnsAmount)
        list2D.map(function (line) {
            //console.log(line)
            if (line.length !== thisLocalized.columnsAmount) {
                throw new MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
            return
        })
        this.cells = list2D.map(row => {
            return row.map(item => {
                return new Cell(item)
            })
        })

        console.log(this.asList2D(), this.asList2DFractions())
    }

    getName() {
        return "unnamed"
    }

    getRelative() {
        return ""
    }

    equals(arg1: Matrix) {
        if (this.columnsAmount !== arg1.columnsAmount || this.rowsAmount !== arg1.rowsAmount) {
            return false
        }
        this.asList2D().forEach((row, i) => {
            row.forEach((item, j) => {
                if (item !== arg1.asList2D()[i][j]) {
                    return false
                }
            })
        })
        return true
    }

    
    toString() {
        let res = "["
        this.asList2D().forEach((row, i) => {
            let rowAcc = "["
            row.forEach((item, j) => {
                rowAcc += item
                if (j < this.columnsAmount - 1) {
                    rowAcc += ","
                }
            })
            res += rowAcc + "]"
            if (i < this.rowsAmount - 1) {
                res += ","
            }
        })
        res += "]"
        return res
    }

    copy() {
        const list2DCopy = this.asList2D().map(x => x.slice())
        return new Matrix(list2DCopy)
    }

    asList2D(){
        return this.cells.map(row => {
            return row.map(item => {
                return item.value
            })
        })
    }

    asList2DFractions() {
        return this.cells.map(row => {
            return row.map(item => {
                return item.valueAsFraction
            })
        })
    }

    getBackgroundColorFor(rowIndex: number, colIndex: number) {
        return this.cells[rowIndex][colIndex].backgroundColor;
    }

    setBackgroundColorFor(rowIndex: number, colIndex: number, color: string) {
        this.cells[rowIndex][colIndex].backgroundColor = color;
    }


}

