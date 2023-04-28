import { pyodide } from "./PyLoader";
import { MatrixInvalidError } from "./MatrixErros";

export class Matrix {
    rowsAmount: number;
    columnsAmount: number;
    asList2D: number[][];
    asList2DFractions: {numerator: number, denominator: number}[][];
    constructor(list2D: Array<Array<number>>) {
        this.rowsAmount = list2D.length
        this.columnsAmount = list2D[0].length
        const thisLocalized = this;
        //console.log(this.rowsAmount, this.columnsAmount, thisLocalized.rowsAmount, thisLocalized.columnsAmount)
        list2D.map(function (line) {
            //console.log(line)
            if (line.length !== thisLocalized.columnsAmount) {
                throw new MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
            return line.forEach(function (item) {
                if (isNaN(Number(item))) {
                    throw new MatrixInvalidError("Matrix has non-numeric elements")
                }
            })
        })
        this.asList2D = list2D
        this.asList2DFractions = list2D.map(row => {
            return row.map(item => {
                pyodide.globals.set("x", item)
                pyodide.runPython("result = sympy.Rational(x).limit_denominator()")
                const r = pyodide.globals.get('result').toJs()
                return {numerator: r.numerator, denominator: r.denominator}
            })
        })
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
        this.asList2D.forEach((row, i) => {
            row.forEach((item, j) => {
                if (item !== arg1.asList2D[i][j]) {
                    return false
                }
            })
        })
        return true
    }

    
    toString() {
        let res = ""
        this.asList2D.forEach((row, i) => {
            let rowAcc = ""
            row.forEach((item, j) => {
                rowAcc += item
                if (j < this.columnsAmount - 1) {
                    rowAcc += ","
                }
            })
            res += rowAcc
            if (i < this.rowsAmount - 1) {
                res += ";"
            }
        })
        return res
    }

    copy() {
        const list2DCopy = this.asList2D.map(x => x.slice())
        return new Matrix(list2DCopy)
    }
}

