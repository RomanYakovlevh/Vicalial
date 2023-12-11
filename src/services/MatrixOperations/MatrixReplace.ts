import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";

export class MatrixReplace extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    constructor(matrixLeft: WorkspaceEntry, matrixRight: WorkspaceEntry) {
        super(replace(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getDescription() + " replaced with " + this.parentRight.getDescription()
    }

}
function replace(parent: WorkspaceEntry, setTo: WorkspaceEntry) {
    //const groupedMap = groupSelectionByRow(selection)
    //const groupedArray = Array.from(groupedMap.values())
    const res = parent.selection.setForWith(parent.parent.asList2D(), setTo.asList2D())
    return res
}