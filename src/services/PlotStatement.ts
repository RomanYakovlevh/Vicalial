import { WorkspaceEntry } from "./Workspace";
import {getLastmatrixId, incrementLastMatrixId} from "@/services/LastMatrixIdStatic";

export class PlotStatement {
    id: number
    parent: WorkspaceEntry
    type: string
    constructor(parent: WorkspaceEntry) {
        this.id = getLastmatrixId()
        incrementLastMatrixId()
        this.parent = parent
        this.type  = 'PlotStatement'
    }
}
