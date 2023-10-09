
import { NamedMatrix } from "../NamedMatrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";
import { getFullParent, getAppengadeByIndex } from "../HelperFunctions";

export class MatrixTransposition extends NamedMatrix {
    parent: WorkspaceEntry
    appendages: string[]
    constructor(matrix: WorkspaceEntry, appendages: string[] = []) {
        super(transposition(matrix, appendages))
        this.parent = matrix
        this.appendages = appendages
    }


    getRelative() {
        return "transposed "+ getFullParent(this.appendages[0], this.parent)
    }
}

function transposition(arg1: WorkspaceEntry, appendages: string[]): Array<Array<string>> {
    const xSelect = arg1.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)

    pyodide.runPython(
        "_mx = numpy.matrix(" + arg1.parent.toString() + ") \n" +
        "result = numpy.transpose((" + a1 + ")* _mx" + xSelect + ").tolist()")
    return pyodide.globals.get('result').toJs()
}