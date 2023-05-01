import { MatrixInvalidError } from "./MatrixErros";
import { pyodide } from "./PyLoader";
import { Matrix } from "./Matrix";
import { MatrixAddition } from "./MatrixOperations/MatrixAddition";
import { MatrixSubstraction } from "./MatrixOperations/MatrixSubstraction";
import { MatrixMultiplication } from "./MatrixOperations/MatrixMultiplication";
import { MatrixTransposition } from "./MatrixOperations/MatrixTransposition";
import { MatrixInversion } from "./MatrixOperations/MatrixInversion";
import { MatrixElemWiseMultiplication } from "./MatrixOperations/MatrixElemWiseMultiplication";
import { NamedMatrix } from "./NamedMatrix";
import { MatrixSelection } from "./MatrixOperations/MatrixSelection";
import { MatrixReplace } from "./MatrixOperations/MatrixReplace";
import { MatrixSwap } from "./MatrixOperations/MatrixSwap";
import { MatrixSize } from "./MatrixOperations/MatrixSize";

export function evaluateMathWithPython(expr: string): number {
    const regex = /^[0-9+\-*/^().\s]+$/;
    const isValid = regex.test(expr);
    if (!isValid) {
        throw new MatrixInvalidError("Mathematical expression is unsafe.")
    }

    return pyodide.runPython(expr);
}

export function runFunctionById(id: number, workspace: Array<{ parent: NamedMatrix, selected: Array<{ row: number, col: number }> }>): Array<Matrix> {
    switch (id) {
        case 0: {
            const e1 = new MatrixSelection(workspace[0].parent, workspace[0].selected, true)
            const e2 = new MatrixSelection(workspace[1].parent, workspace[1].selected, true)
            return [new MatrixAddition(e1, e2)]
        }
        case 1: {
            const e1 = new MatrixSelection(workspace[0].parent, workspace[0].selected, true)
            const e2 = new MatrixSelection(workspace[1].parent, workspace[1].selected, true)
            return [new MatrixSubstraction(e1, e2)]
        }
        case 2: {
            const e1 = new MatrixSelection(workspace[0].parent, workspace[0].selected, true)
            const e2 = new MatrixSelection(workspace[1].parent, workspace[1].selected, true)
            return [new MatrixMultiplication(e1, e2)]
        }
        case 3: {
            const e1 = new MatrixSelection(workspace[0].parent, workspace[0].selected, true)
            return [new MatrixTransposition(e1)]
        }
        case 4: {
            const e1 = new MatrixSelection(workspace[0].parent, workspace[0].selected, true)
            return [new MatrixInversion(e1)]
        }
        case 5: {
            return [new MatrixReplace(workspace[0].parent, workspace[1].parent, workspace[0].selected, workspace[1].selected)]
        }
        case 6: {
            //Swap
            if (workspace[0].parent.equals(workspace[1].parent)) {
                return [new MatrixSwap(workspace[0].parent, workspace[1].parent, workspace[0].selected, workspace[1].selected)]
            } else {
                return [new MatrixReplace(workspace[0].parent, workspace[1].parent, workspace[0].selected, workspace[1].selected),
                new MatrixReplace(workspace[1].parent, workspace[0].parent, workspace[1].selected, workspace[0].selected)]
            }
        }
        case 7:
            break
        case 8:
            break
        case 9: {
            return [new MatrixSize(workspace[0].parent, workspace[0].selected)]
        }
        case 10: {
            //Select
            const allSelections = workspace.reduce((acc, x) => {
                return acc.parent.id === x.parent.id ?
                    { parentId: acc.parent.id, parent: acc.parent, selected: acc.selected.concat(x.selected) } :
                    acc
            }).selected
            return [new MatrixSelection(workspace[0].parent, allSelections)]
        }
        case 16: {
            const e1 = new MatrixSelection(workspace[0].parent, workspace[0].selected, true)
            const e2 = new MatrixSelection(workspace[1].parent, workspace[1].selected, true)
            return [new MatrixElemWiseMultiplication(e1, e2)]
        }
    }
    throw new Error("This operation is not implemented yet.")
}

export function addition(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = numpy.add(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function subtraction(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = numpy.subtract(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function multiplication(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result =  numpy.matmul(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function elemWiseMultiplication(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = numpy.multiply(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function transposition(arg1: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "result = numpy.transpose(mx).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function inversion(arg1: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "result = numpy.linalg.inv(mx).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function extractErrorMessage(traceback: string): string {
    const errorMessage = traceback.match(/^[^\n]*/)?.[0] ?? traceback;
    return errorMessage.trim();
  }

export function select(arg1: Matrix, cellsToExtract: Array<{ row: number, col: number }>) {
    const groupedMap = groupSelectionByRow(cellsToExtract)
    return Array.from(groupedMap.values()).map(x => x.map(({ row, col }) => arg1.asList2D[row][col]))
}

export function replace(arg1: Matrix, arg1Selection: Array<{ row: number, col: number }>, arg2: Matrix, arg2Selection: Array<{ row: number, col: number }>) {
    const e2 = new MatrixSelection(arg2, arg2Selection, true)
    return setElementsBySelection(arg1, arg1Selection, e2)
}

export function swap(arg1: Matrix, arg1Selection: Array<{ row: number, col: number }>, arg2: Matrix, arg2Selection: Array<{ row: number, col: number }>) {
    const e1 = new MatrixSelection(arg1, arg1Selection, true)
    const e2 = new MatrixSelection(arg2, arg2Selection, true)
    let res = setElementsBySelection(arg1, arg1Selection, e2)

    if (!arg1.equals(arg2)) {
        //resArr.push(setElementsBySelection(arg2, arg2Selection, e1))
        throw new Error("Tried to swap between matrixes")
    } else {
        res = setElementsBySelection(new Matrix(res), arg2Selection, e1)
    }

    return res
}

export function groupSelectionByRow(cellsToExtract: Array<{ row: number, col: number }>) {
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

export function setElementsBySelection(parent: Matrix, selection: Array<{ row: number, col: number }>, setTo: Matrix) {
    const groupedMap = groupSelectionByRow(selection)
    const groupedArray = Array.from(groupedMap.values())
    if (groupedArray.map(x => x.length !== setTo.columnsAmount).reduce((prev, cur) => prev || cur) || groupedArray.length !== setTo.rowsAmount) {
        throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.")
    }
    const res = parent.copy() // This can be pre-filled 2d array but i got lazy. TODO: rewrite
    groupedArray.forEach((row, i) => {
        row.forEach((item, j) => {
            res.asList2D[item.row][item.col] = setTo.asList2D[i][j]
        })
    })
    return res.asList2D
}