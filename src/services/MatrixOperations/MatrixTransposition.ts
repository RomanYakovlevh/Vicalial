
import { NamedMatrix } from "../NamedMatrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";

export class MatrixTransposition extends NamedMatrix {
    parent: WorkspaceEntry
    constructor(matrix: WorkspaceEntry) {
        super(transposition(matrix))
        this.parent = matrix
    }


    getRelative() {
        return "transposed "+ this.parent.getDescription()
    }
}

function transposition(arg1: WorkspaceEntry): Array<Array<number>> {
    const xSelect = arg1.selection.getDescription()
    pyodide.globals.set('x', arg1.parent.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "result = numpy.transpose(mx" + xSelect + ").tolist()")
    return pyodide.globals.get('result').toJs()
}