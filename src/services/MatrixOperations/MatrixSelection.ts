import { Matrix } from "../Matrix";
import { addition, select } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixSelection extends NamedMatrix {
    parent: Matrix
    selection: Array<{ row: number, col: number }>
    constructor(matrix: Matrix, cellsToExtract: Array<{ row: number, col: number }>) {
        super(select(matrix, cellsToExtract))
        this.parent = matrix
        this.selection = cellsToExtract
    }


    getRelative() {
        return this.parent.getName() + "" + this.describeSelection()
    }

    describeSelection() {
        if (this.selection.filter(x => x.col === this.selection[0].col).length === this.selection.length) {
            if (this.selection.length === this.parent.rowsAmount) {
                return "(:, " + this.selection[0].col + ")"
            } else {
                let minRow = Number.MAX_SAFE_INTEGER
                let maxRow = Number.MIN_SAFE_INTEGER
                this.selection.forEach(v => {
                    if (v.row < minRow) {
                        minRow = v.row
                    }
                    if  (v.row > maxRow) {
                        maxRow = v.row
                    }
                })
                return "(" + minRow + ".." + maxRow + ", " + this.selection[0].col + ")"
            }
        } else if (this.selection.filter(x => x.row === this.selection[0].row).length === this.selection.length) {
            if (this.selection.length === this.parent.columnsAmount) {
                return "(" + this.selection[0].row + ", :)"
            } else {
                let minCol = Number.MAX_SAFE_INTEGER
                let maxCol = Number.MIN_SAFE_INTEGER
                this.selection.forEach(v => {
                    if (v.col < minCol) {
                        minCol = v.col
                    }
                    if  (v.col > maxCol) {
                        maxCol = v.col
                    }
                })
                return "(" + this.selection[0].col + ", " + minCol + ".." + maxCol + ")"
            }
        } else {
            let acc = "("

            this.selection.forEach(v => {
                acc += "(" + v.row + ", " + v.col + ")"
            })

            return acc + ")"
        }
    }

    getName() {
        return this.getRelative()
    }

}