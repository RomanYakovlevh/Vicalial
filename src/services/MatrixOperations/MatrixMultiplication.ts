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

function multiplication(arg1: WorkspaceEntry, arg2: WorkspaceEntry, appendages: string[]): Array<Array<number>> {
    const xSelect = arg1.selection.getDescription()
    const ySelect = arg2.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)
    const a2 = getAppengadeByIndex(appendages, 1)

    pyodide.globals.set('x', arg1.parent.toString())
    pyodide.globals.set('y', arg2.parent.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = ensureMatrix(numpy.matmul((" + a1 + ")* mx" + xSelect + ", (" + a2 + ")* my" + ySelect + "))")
    return pyodide.globals.get('result').toJs()
}