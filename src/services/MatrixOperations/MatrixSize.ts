import { Matrix } from "../Matrix";
import { select } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixSize extends NamedMatrix {
    parent: Matrix
    selection: Array<{row: number, col: number}>
    selectionDescription: string
    constructor(matrix: Matrix, selection: Array<{ row: number, col: number }>) {
        const e1 = select(matrix, selection)
        super([[e1.length, e1[0].length]])
        this.parent = matrix
        this.selection = selection
        this.selectionDescription = this.describeSelection(matrix, selection)
    }


    getRelative() {
        return "size of "+ this.parent.getName() + "" + this.selectionDescription
    }

    describeSelection(parent: Matrix, selection: Array<{ row: number, col: number }>): string {
        const v = this.verifySelection(parent, selection)
        if (v !== false) {
            if (v.upperLeft.minRow === v.lowerRight.maxRow && v.upperLeft.minCol === v.lowerRight.maxCol) {
                return "[" + v.upperLeft.minRow + ", " + v.upperLeft.minCol + "]"
            }
            else if (v.upperLeft.minRow === 0 && v.upperLeft.minCol === 0
                && v.lowerRight.maxRow === parent.rowsAmount - 1 && v.lowerRight.maxCol === parent.columnsAmount - 1) {
                return ""
            } else if (v.upperLeft.minRow === v.lowerRight.maxRow) {
                if (v.upperLeft.minCol === 0 && v.lowerRight.maxCol === parent.columnsAmount - 1) {
                    return "[" + v.upperLeft.minRow + ", :]"
                } else {
                    return "[" + v.upperLeft.minRow + ", " + v.upperLeft.minCol + ":" + v.lowerRight.maxCol + "]"
                }

            } else if (v.upperLeft.minCol === v.lowerRight.maxCol) {
                if (v.upperLeft.minRow === 0 && v.lowerRight.maxRow === parent.rowsAmount - 1) {
                    return "[:, " + v.upperLeft.minCol + "]"
                } else {
                    return "[" + v.upperLeft.minRow + ":" + v.lowerRight.maxRow + ", " + v.upperLeft.minCol + "]"
                }
            } else {
                return "[" + v.upperLeft.minRow + ":" + v.lowerRight.maxRow + ", " + v.upperLeft.minCol + ":" + v.lowerRight.maxCol + "]"
            }
        } else {
            let acc = "["

            selection.forEach(v => {
                acc += "(" + v.row + ", " + v.col + ")"
            })

            return acc + "]"
        }

    }

    verifySelection(parent: Matrix, selection: Array<{ row: number, col: number }>): { upperLeft: { minRow: number, minCol: number }, lowerRight: { maxRow: number, maxCol: number } } | false {
        let maxRow = Number.MIN_SAFE_INTEGER
        let minRow = Number.MAX_SAFE_INTEGER
        let maxCol = Number.MIN_SAFE_INTEGER
        let minCol = Number.MAX_SAFE_INTEGER

        selection.forEach((x) => {
            if (x.row > maxRow) {
                maxRow = x.row
            }
            if (x.row < minRow) {
                minRow = x.row
            }
            if (x.col > maxCol) {
                maxCol = x.col
            }
            if (x.col < minCol) {
                minCol = x.col
            }
        })

        console.log((maxRow - minRow + 1) * (maxCol - minCol + 1))

        return (maxRow - minRow + 1) * (maxCol - minCol + 1) === selection.length ? { upperLeft: { minRow, minCol }, lowerRight: { maxRow, maxCol } } : false
    }
}