import { pyodide } from "./PyLoader";
import { MatrixInvalidError } from "./MatrixErros";

export class Matrix {
    rowsAmount: number;
    columnsAmount: number;
    asList2D: string[][];
    asList2DFractions: string[][];
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
        this.asList2D = list2D
        this.asList2DFractions = list2D.map(row => {
            return row.map(item => {
                return pyodide.runPython(
                    "str(parse_expr('" + item + "', transformations=auto_number_and_ratonalize_transformation)) \n"
                    )
            })
        })

        console.log(this.asList2D, this.asList2DFractions)
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
        /*
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
        */
        let res = "["
        this.asList2D.forEach((row, i) => {
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
        const list2DCopy = this.asList2D.map(x => x.slice())
        return new Matrix(list2DCopy)
    }
}

