import { NamedMatrix } from "../NamedMatrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";
import { getFullParent, getAppengadeByIndex } from "../HelperFunctions";
export class MatrixMultiplication extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    appendages: string[]
    constructor(matrixLeft: WorkspaceEntry, matrixRight: WorkspaceEntry, appendages: string[] = []) {
        super(multiplication(matrixLeft, matrixRight, appendages))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
        this.appendages = appendages
    }


    getRelative() {
        return getFullParent(this.appendages[0], this.parentLeft) + " * " + getFullParent(this.appendages[1], this.parentRight)
    }
}

function multiplication(arg1: WorkspaceEntry, arg2: WorkspaceEntry, appendages: string[]): Array<Array<string>> {
    const xSelect = arg1.selection.getDescription()
    const ySelect = arg2.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)
    const a2 = getAppengadeByIndex(appendages, 1)

    pyodide.runPython(
        "_mx = numpy.matrix(" + arg1.parent.toString() + ") \n" +
        "_my = numpy.matrix(" + arg2.parent.toString() + ") \n" +
        "result = ensureMatrix(numpy.matmul((" + a1 + ")* _mx" + xSelect + ", (" + a2 + ")* _my" + ySelect + "))")
    return pyodide.globals.get('result').toJs()
}