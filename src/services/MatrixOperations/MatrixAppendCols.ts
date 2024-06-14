import { Matrix } from "../Matrix";
import { WorkspaceEntry } from "../Workspace";

export class MatrixAppendCols extends Matrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    constructor(parentLeft: WorkspaceEntry, parentRight: WorkspaceEntry) {
        const pr2d = parentRight.asList2D()
        super(parentLeft.asList2D().map((x, i) => x.concat(pr2d[i])))
        this.parentLeft = parentLeft
        this.parentRight = parentRight
        this.giveNextName()
    }

    getRelative(): string {
        return "columns of "+ this.parentRight.getDescription() + " appeneded to " + this.parentLeft.getDescription()
    }
}