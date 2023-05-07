import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";

export class MatrixAppendRows extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    constructor(parentLeft: WorkspaceEntry, parentRight: WorkspaceEntry) {
        const pr2d = parentRight.asList2D()
        super(parentLeft.asList2D().concat(pr2d))
        this.parentLeft = parentLeft
        this.parentRight = parentRight
    }

    getRelative(): string {
        return "rows of "+ this.parentRight.getDescription() + " appeneded to " + this.parentLeft.getDescription()
    }
}