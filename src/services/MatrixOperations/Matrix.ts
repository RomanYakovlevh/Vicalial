import { pyodide } from "../PyLoader";

export class Matrix {
    rowsAmount: number;
    columnsAmount: number;
    asList2D: number[][];
    asList2DFractions: {numerator: number, denominator: number}[][];
    constructor(list2D: Array<Array<number>>) {
        //console.log("HIIII")

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
            "result =  numpy.matmul(mx, my).tolist()")
        return new Matrix(pyodide.globals.get('result').toJs())
    }

    elemWiseMultiplication(arg2: Matrix) {
        pyodide.globals.set("x", this.toString())
        pyodide.globals.set("y", arg2.toString())
        pyodide.runPython(
            "mx = numpy.matrix(x) \n" +
            "my = numpy.matrix(y) \n" +
            "result = numpy.multiply(mx, my).tolist()")
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

export function evaluateMathWithPython(expr: string): number {
    const regex = /^[0-9+\-*/^().\s]+$/;
    const isValid = regex.test(expr);
    if (!isValid) {
        throw new MatrixInvalidError("Mathematical expression is unsafe.")
    }

    return pyodide.runPython(expr);
}

export function runFunctionById(id: number, workspace: Array<{ parentId: number, parent: Matrix, selected: Array<{ row: number, col: number }> }>): Array<Matrix> {
    switch (id) {
        case 0: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [e1.addition(e2)]
        }
        case 1: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [e1.subtraction(e2)]
        }
        case 2: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [e1.multiplication(e2)]
        }
        case 3: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return [e1.transposition()]
        }
        case 4: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return [e1.inversion()]
        }
        case 5: {
            //Replace
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            const res = workspace[0].parent.setElementsBySelection(workspace[0].selected, e2)
            return [res]
        }
        case 6: {
            //Swap
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            const resArr = [workspace[0].parent.setElementsBySelection(workspace[0].selected, e2)]
            if (workspace[0].parentId !== workspace[1].parentId) {
                resArr.push(workspace[1].parent.setElementsBySelection(workspace[1].selected, e1))
            } else {
                resArr[0] = resArr[0].setElementsBySelection(workspace[1].selected, e1)
            }
            return resArr
        }
        case 7:
            break
        case 8:
            break
        case 9: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return [new Matrix([[e1.rowsAmount, e1.columnsAmount]])]
        }
        case 10: {
            const allSelections = workspace.reduce((acc, x) => {
                return acc.parentId === x.parentId ?
                    { parentId: acc.parentId, parent: acc.parent, selected: acc.selected.concat(x.selected) } :
                    acc
            }).selected
            return [workspace[0].parent.extractElemsAsMatrix(allSelections)]
        }
        case 16: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [e1.elemWiseMultiplication(e2)]
        }
    }
    throw new Error("This operation is not implemented yet.")
}