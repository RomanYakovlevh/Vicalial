import { pyodide } from "./PyLoader";

export class Matrix {
    rowsAmount: number;
    columnsAmount: number;
    asList2D: number[][];
    constructor(list2D: Array<Array<number>>) {
        //console.log("HIIII")

        this.rowsAmount = list2D.length
        this.columnsAmount = list2D[0].length
        const thisLocalized = this;
        //console.log(this.rowsAmount, this.columnsAmount, thisLocalized.rowsAmount, thisLocalized.columnsAmount)
        list2D.forEach(function (line) {
            //console.log(line)
            if (line.length !== thisLocalized.columnsAmount) {
                throw new MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
            line.forEach(function (item) {
                if (isNaN(Number(item))) {
                    throw new MatrixInvalidError("Matrix has non-numeric elements")
                }
            })
        })
        this.asList2D = list2D
    }

    groupSelectionByRow(cellsToExtract: Array<{ row: number, col: number }>) {
        const groupedMap: Map<number, Array<{ row: number, col: number }>> = new Map()
        cellsToExtract.slice().forEach(({ row, col }) => {
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
        if (groupedArray.map(x => x.length !== setTo.columnsAmount).reduce((prev, cur) => prev || cur)  || groupedArray.length !== setTo.rowsAmount) {
            throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.")
        }
        groupedArray.forEach((row, i) => {
            row.forEach((item, j) => {
                this.asList2D[item.row][item.col] = setTo.asList2D[i][j]
            })
        })
    }

    extractElemsAsMatrix(cellsToExtract: Array<{ row: number, col: number }>) {
        const groupedMap = this.groupSelectionByRow(cellsToExtract)
        return new Matrix(Array.from(groupedMap.values()).map(x => x.map(({ row, col }) => this.asList2D[row][col])))
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

    addition(arg2: Matrix) {
        pyodide.globals.set("x", this.toString())
        pyodide.globals.set("y", arg2.toString())
        pyodide.runPython(
            "mx = numpy.matrix(x) \n" +
            "my = numpy.matrix(y) \n" +
            "result = numpy.add(mx, my).tolist()")
        return new Matrix(pyodide.globals.get('result').toJs())
    }

    subtraction(arg2: Matrix) {
        pyodide.globals.set("x", this.toString())
        pyodide.globals.set("y", arg2.toString())
        pyodide.runPython(
            "mx = numpy.matrix(x) \n" +
            "my = numpy.matrix(y) \n" +
            "result = numpy.subtract(mx, my).tolist()")
        return new Matrix(pyodide.globals.get('result').toJs())
    }

    multiplication(arg2: Matrix) {
        pyodide.globals.set("x", this.toString())
        pyodide.globals.set("y", arg2.toString())
        pyodide.runPython(
            "mx = numpy.matrix(x) \n" +
            "my = numpy.matrix(y) \n" +
            "result = mx * my")
        return new Matrix(pyodide.globals.get('result').toJs())
    }

    transposition() {
        pyodide.globals.set("x", this.toString())
        pyodide.runPython(
            "mx = numpy.matrix(x) \n" +
            "result = numpy.transpose(mx).tolist()")
        return new Matrix(pyodide.globals.get('result').toJs())
    }

    inversion() {
        pyodide.globals.set("x", this.toString())
        pyodide.runPython(
            "mx = numpy.matrix(x) \n" +
            "result = numpy.linalg.inv(mx).tolist()")
        return new Matrix(pyodide.globals.get('result').toJs())
    }
}

export class MatrixInvalidError extends Error { }

export function runFunctionById(id: number, workspace: Array<{ parentId: number, parent: Matrix, selected: Array<{ row: number, col: number }> }>): Matrix {
    switch (id) {
        case 0: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return e1.addition(e2)
        }
        case 1: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return e1.subtraction(e2)
        }
        case 2: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return e1.multiplication(e2)
        }
        case 3: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return e1.transposition()
        }
        case 4: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return e1.inversion()
        }
        case 5: {
            //Replace
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            const res = workspace[0].parent.copy()
            res.setElementsBySelection(workspace[0].selected, e2)
            return res
        }
        case 6:
            break
        case 7:
            break
        case 8:
            break
        case 9:
            break
        case 10:
            break
    }
    return new Matrix([])
}