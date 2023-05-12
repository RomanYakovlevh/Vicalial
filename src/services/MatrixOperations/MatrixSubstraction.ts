import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";
import { pyodide } from "../PyLoader";
import { getAppengadeByIndex, getFullParent } from "../HelperFunctions";

export class MatrixSubstraction extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    appendages: string[]
    constructor(matrixLeft: WorkspaceEntry, matrixRight: WorkspaceEntry, inParent: Boolean = false, appendages: string[] = []) {
        if (inParent) {
            const a = subtraction(matrixLeft, matrixRight, appendages)
            super(matrixLeft.selection.setForWith(matrixLeft.parent.asList2D, a))
        } else {
            super(subtraction(matrixLeft, matrixRight, appendages))
        }
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
        this.appendages = appendages
    }


    getRelative() {
        return getFullParent(this.appendages[0], this.parentLeft) + " - " + getFullParent(this.appendages[1], this.parentRight)
    }
}

function subtraction(arg1: WorkspaceEntry, arg2: WorkspaceEntry, appendages: string[]): Array<Array<number>> {
    const xSelect = arg1.selection.getDescription()
    const ySelect = arg2.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)
    const a2 = getAppengadeByIndex(appendages, 1)

    pyodide.globals.set('x', arg1.parent.toString())
    pyodide.globals.set('y', arg2.parent.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = ensureMatrix(numpy.subtract((" + a1 + ")* mx" + xSelect + ", (" + a2 + ")* my" + ySelect + "))")
    return pyodide.globals.get('result').toJs()
}