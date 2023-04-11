import { pyodide } from "./PyLoader";

export class Matrix {
    rowsAmount: number;
    columnsAmount: number;
    asList2D: number[][];
    constructor(list2D: Array<Array<number>>) {
        console.log("HIIII")

        this.rowsAmount = list2D.length
        this.columnsAmount = list2D[0].length
        const thisLocalized = this;
        console.log(this.rowsAmount, this.columnsAmount, thisLocalized.rowsAmount, thisLocalized.columnsAmount)
        list2D.forEach(function (line) {
            console.log(line)
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

    extractElemsAsMatrix(cellsToExtract: Array<{ row: number, col: number }>) {
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


        return new Matrix(Array.from(groupedMap.values()).map(x => x.map(({ row, col }) => this.asList2D[row][col])))
    }

    addition(arg2: Matrix) {
        const np = pyodide.globals.get('numpy')
        const arr = np.array(this.asList2D)
        const arr2 = np.array(arg2.asList2D)
        const c = np.add(arr, arr2)
        console.log(c)
        return new Matrix(c)
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

        case 1:
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
        case 5:
            break
        case 6:
            break
        case 7:
            break
        case 8:
            break
        case 9:
            break
    }
    return new Matrix([])
}