
import { NamedMatrix } from "../NamedMatrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";
import { getFullParent, getAppengadeByIndex } from "../HelperFunctions";

export class MatrixInversion extends NamedMatrix {
    parent: WorkspaceEntry
    appendages: string[]
    constructor(matrix: WorkspaceEntry, appendages: string[] = []) {
        super(transposition(matrix, appendages))
        this.parent = matrix
        this.appendages = appendages
    }

    getRelative() {
        return getFullParent(this.appendages[0], this.parent) +"^-1"
    }
}

function transposition(arg1: WorkspaceEntry, appendages: string[]): Array<Array<string>> {
    const xSelect = arg1.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)

    pyodide.runPython(
        "_mx = numpy.matrix(" + arg1.parent.toString() + ") \n" +
        "result = numpy.linalg.inv((" + a1 + ")* _mx" + xSelect + ").tolist()")
    return pyodide.globals.get('result').toJs()
}