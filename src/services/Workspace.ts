import { NamedMatrix } from "./NamedMatrix";


export interface SelectionType {
}

export class RowSelection implements SelectionType {
    row: number
    constructor(row: number) {
        this.row = row
    }
}

export class ColSelection implements SelectionType {
    col: number
    constructor(col: number) {
        this.col = col
    }
}

export class AllSelection implements SelectionType { }

export class CellSelection implements SelectionType {
    row: number
    col: number
    constructor(row: number, col: number) {
        this.row = row
        this.col = col
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
                return {row: x.selection.row, col: x.selection.col}
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
    parent: NamedMatrix
    selection: SelectionType
    constructor(parent: NamedMatrix, selection: SelectionType) {
        this.parent = parent
        this.selection = selection
    }
}