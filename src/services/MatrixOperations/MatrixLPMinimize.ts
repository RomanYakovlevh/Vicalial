
import { Matrix } from "../Matrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";

export class MatrixLPMinimize extends Matrix {
    parent: WorkspaceEntry
    constructor(matrix: WorkspaceEntry) {
        const r = transposition(matrix)
        super(r)
        this.parent = matrix
        this.giveNextName()
    }

    getRelative() {
        return 'minimized variables by objective function ' + this.parent.getDescription()
    }
}

function transposition(arg1: WorkspaceEntry): Array<Array<string>> {
    const xSelect = arg1.selection.getDescription()
    pyodide.runPython(
        "_mx = numpy.matrix(" + arg1.parent.toString() + ") \n" +
        "result = [minimize_lp(_mx" + xSelect + ").tolist()]")
    return pyodide.globals.get('result').toJs()
}