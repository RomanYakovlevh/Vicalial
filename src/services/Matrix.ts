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

    groupSelectionByRow(cellsToExtract: Array<{ row: number, col: number }>) {
        const groupedMap: Map<number, Array<{ row: number, col: number }>> = new Map()
        cellsToExtract.slice().sort(function (a, b) {
            if (a.row - b.row !== 0) {
                return a.row - b.row
            } else {
                return a.col - b.col
            }
        }).forEach(({ row, col }) => {
                const arr = groupedMap.get(row)
                if (arr === undefined) {
                    groupedMap.set(row, new Array({ row, col }))
                } else {
                    arr.push({ row, col })
                    groupedMap.set(row, arr)
                }

            })

        return groupedMap
    }

    setElementsBySelection(selection: Array<{ row: number, col: number }>, setTo: Matrix) {
        const groupedMap = this.groupSelectionByRow(selection)
        const groupedArray = Array.from(groupedMap.values())
        if (groupedArray.map(x => x.length !== setTo.columnsAmount).reduce((prev, cur) => prev || cur) || groupedArray.length !== setTo.rowsAmount) {
            throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.")
        }
        const res = this.copy() // This can be pre-filled 2d array but i got lazy. TODO: rewrite
        groupedArray.forEach((row, i) => {
            row.forEach((item, j) => {
                res.asList2D[item.row][item.col] = setTo.asList2D[i][j]
            })
        })
        return new Matrix(res.asList2D)
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

