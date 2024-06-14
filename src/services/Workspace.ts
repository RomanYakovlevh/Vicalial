
import { Matrix } from "./Matrix";

export interface SelectionType {
    getDescription(): string

    getFrom(other: Array<Array<string>>): Array<Array<string>>

    setForWith(matrix: string[][], setTo: string[][]): string[][]

    getAsIndexesFor(matrix: string[][]): Array<{ row: number, col: number }>
}

export class RowSelection implements SelectionType {
    row: number
    constructor(row: number) {
        this.row = row
    }

    getDescription(): string {
        return "[" + this.row + ", :]"
    }

    getFrom(other: Array<Array<string>>): Array<Array<string>> {
        return [other[this.row]]
    }

    setForWith(matrix: string[][], setTo: string[][]): string[][] {
        const rx = this.getFrom(matrix)
        if (1 !== setTo.length || rx[0].length !== setTo[0].length) {
            throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.")
        }
        const res = matrix.map(x => x.slice())
        res[this.row] = setTo[0]
        return res
    }

    getAsIndexesFor(matrix: string[][]): { row: number; col: number; }[] {
        console.log(matrix)
        return matrix[this.row].map((x, i) => {
            x; //<-- Just so i dowsnt throw error un unused variables
            return { row: this.row, col: i }
        })
    }
}

export class ColSelection implements SelectionType {
    col: number
    constructor(col: number) {
        this.col = col
    }
    getDescription(): string {
        return "[:, " + this.col + "]"
    }

    getFrom(other: string[][]) {
        return other.map(x => [x[this.col]])
    }

    setForWith(matrix: string[][], setTo: string[][]): string[][] {
        const rx = this.getFrom(matrix)
        if (rx.length !== setTo.length || 1 !== setTo[0].length) {
            throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with: rx.length: " + rx.length + ", setTo.length: " + setTo.length + ", setTo[0].length: " + setTo[0].length)
        }
        let res = matrix.map(x => x.slice())
        res = res.map((x, i) => {
            x[this.col] = setTo[i][0]
            return x
        })
        return res
    }

    getAsIndexesFor(matrix: string[][]): { row: number; col: number; }[] {
        return matrix.map((x, i) => {
            x; //<-- Just so i dowsnt throw error un unused variables
            return { row: i, col: this.col }
        })
    }
}

export class AllSelection implements SelectionType {
    getDescription(): string {
        return ""
    }

    getFrom(other: string[][]): string[][] {
        return other
    }

    setForWith(matrix: string[][], setTo: string[][]): string[][] {
        const rx = this.getFrom(matrix)
        const lx = setTo
        if (rx.length !== lx.length || rx[0].length !== lx[0].length) {
            throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.")
        }

        return setTo.map(x => x.slice())
    }

    getAsIndexesFor(matrix: string[][]): { row: number; col: number; }[] {
        return matrix.map((x, i) => {
            return x.map((_, j) => {
                return { row: i, col: j }
            })
        }).flat()
    }
}

export class CellSelection implements SelectionType {
    row: number
    col: number
    constructor(row: number, col: number) {
        this.row = row
        this.col = col
    }

    getDescription(): string {
        return "[" + this.row + ", " + this.col + "]"
    }

    getFrom(other: string[][]): string[][] {
        return [[other[this.row][this.col]]]
    }

    setForWith(matrix: string[][], setTo: string[][]): string[][] {
        if (1 !== setTo.length || 1 !== setTo[0].length) {
            throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.")
        }

        const res = matrix.map(x => x.slice())
        res[this.row][this.col] = setTo[0][0]
        return res
    }

    getAsIndexesFor(_: string[][]): { row: number; col: number; }[] {
        return [{row: this.row, col: this.col}]
    }
}

export class Workspace {
    list: Array<WorkspaceEntry>
    constructor() {
        this.list = []
    }

    getSelectedRowsFor(parentId: number) {
        const r = this.list.filter(e => e.parent.id === parentId && e.selection instanceof RowSelection).map(x => {
            if (x.selection instanceof RowSelection) {
                return x.selection.row
            } else {
                throw new Error('x.selection was not RowSelection instance')
            }
        })
        return r
    }

    getSelectedColsFor(parentId: number) {
        const r = this.list.filter(e => e.parent.id === parentId && e.selection instanceof ColSelection).map(x => {
            if (x.selection instanceof ColSelection) {
                return x.selection.col
            } else {
                throw new Error('x.selection was not ColSelection instance')
            }
        })
        return r
    }

    getSelectedCellsFor(parentId: number) {
        const r = this.list.filter(e => e.parent.id === parentId && e.selection instanceof CellSelection).map(x => {
            if (x.selection instanceof CellSelection) {
                return { row: x.selection.row, col: x.selection.col }
            } else {
                throw new Error('x.selection was not CellSelection instance')
            }
        })
        return r
    }

    getSelectedAllFor(parentId: number) {
        const r = this.list.filter(e => e.parent.id === parentId && e.selection instanceof AllSelection).length > 0
        return r
    }
}

export class WorkspaceEntry {
    parent: Matrix
    selection: SelectionType
    constructor(parent: Matrix, selection: SelectionType) {
        this.parent = parent
        this.selection = selection
    }

    getDescription() {
        return this.parent.getName() + "" + this.selection.getDescription()
    }

    asList2D() {
        return this.selection.getFrom(this.parent.asList2D())
    }

    getSelectionsAsIndexes() {

    }
}