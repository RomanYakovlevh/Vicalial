import { Matrix } from "../Matrix";
import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";

export class MatrixSwap extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    constructor(matrixLeft: WorkspaceEntry, matrixRight: WorkspaceEntry) {
        super(swap(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getDescription() + " swapped with " + this.parentRight.getDescription()
    }

}

function swap(arg1: WorkspaceEntry, arg2: WorkspaceEntry) {
    let res = arg1.selection.setForWith(arg1.parent.asList2D, arg2.parent.asList2D)

    if (!arg1.parent.equals(arg2.parent)) {
        //resArr.push(setElementsBySelection(arg2, arg2Selection, e1))
        throw new Error("Tried to swap between matrixes")
    } else {
        res = arg2.selection.setForWith(res, arg1.parent.asList2D)
    }

    return res
}