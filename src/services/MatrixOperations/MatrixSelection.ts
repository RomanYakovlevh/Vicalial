import { Matrix } from "../Matrix";
import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";

export class MatrixSelection extends NamedMatrix {
    parents: WorkspaceEntry[]
    selections: Array<{ row: number, col: number }>
    constructor(parents: WorkspaceEntry[], supressed: boolean = false) {
        const etalon = parents[0].parent.id
        parents = parents.filter(x => x.parent.id === etalon)
        const selections = parents.map(x => x.selection.getAsIndexesFor(x.asList2D())).flat()
        super(select(parents[0].asList2D(), selections), supressed)
        this.selections = selections
        this.parents = parents
    }


    getRelative() {
        return "selections from " + this.parents[0].parent.name
    }

    getName() {
        return this.getRelative()
    }

}

function select(arg1: number[][], cellsToExtract: Array<{ row: number, col: number }>) {
    const groupedMap = groupSelectionByRow(cellsToExtract)
    return Array.from(groupedMap.values()).map(x => x.map(({ row, col }) => arg1[row][col]))
}

function groupSelectionByRow(cellsToExtract: Array<{ row: number, col: number }>) {
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