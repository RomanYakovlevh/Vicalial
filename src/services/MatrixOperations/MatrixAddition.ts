
import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";
import { pyodide } from "../PyLoader";
import { getAppengadeByIndex, getFullParent } from "../HelperFunctions";

export class MatrixAddition extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    appendages: string[]
    constructor(matrixLeft: WorkspaceEntry, matrixRight: WorkspaceEntry, inParent: Boolean = false, appendages: string[] = []) {
        if (inParent) {
            const a = addition(matrixLeft, matrixRight, appendages)
            super(matrixLeft.selection.setForWith(matrixLeft.parent.asList2D(), a))
        } else {
            super(addition(matrixLeft, matrixRight, appendages))
        }
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
        this.appendages = appendages
    }


    getRelative() {
        return getFullParent(this.appendages[0], this.parentLeft) + " + " + getFullParent(this.appendages[1], this.parentRight)
    }
}

function addition(arg1: WorkspaceEntry, arg2: WorkspaceEntry, appendages: string[]): Array<Array<string>> {
    const xSelect = arg1.selection.getDescription()
    const ySelect = arg2.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)
    const a2 = getAppengadeByIndex(appendages, 1)

    //pyodide.globals.set('x', arg1.parent.toString())
    //pyodide.globals.set('y', arg2.parent.toString())
    pyodide.runPython(
        "_mx = numpy.matrix(" + arg1.parent.toString() + ") \n" +
        "_my = numpy.matrix(" + arg2.parent.toString() + ") \n" +
        "result = ensureMatrix(numpy.add((" + a1 + ")* _mx" + xSelect + ", (" + a2 + ")* _my" + ySelect + ")) \n")
    return pyodide.globals.get('result').toJs()
}