import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";

export class MatrixSize extends NamedMatrix {
    parent: WorkspaceEntry
    constructor(matrix: WorkspaceEntry) {
        const e1 = matrix.selection.getFrom(matrix.parent.asList2D())
        super([[e1.length.toString(), e1[0].length.toString()]])
        this.parent = matrix
    }

    getRelative() {
        return "size of "+ this.parent.getDescription()
    }

}