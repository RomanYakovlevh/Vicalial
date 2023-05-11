
import { NamedMatrix } from "../NamedMatrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";

export class MatrixLPMinimize extends NamedMatrix {
    parent: WorkspaceEntry
    constructor(matrix: WorkspaceEntry) {
        const r = transposition(matrix)
        console.log(r)
        super(r)
        this.parent = matrix
    }

    getRelative() {
        return 'minimized variables by objective function ' + this.parent.getDescription()
    }
}

function transposition(arg1: WorkspaceEntry): Array<Array<number>> {
    const xSelect = arg1.selection.getDescription()
    pyodide.globals.set('x', arg1.parent.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "result = [minimize_lp(mx" + xSelect + ").tolist()]")
    return pyodide.globals.get('result').toJs()
}