import { NamedMatrix } from "../NamedMatrix";
import { WorkspaceEntry } from "../Workspace";
import { pyodide } from "../PyLoader";
import { getAppengadeByIndex, getFullParent } from "../HelperFunctions";

export class MatrixMultiplyByConstant extends NamedMatrix {
    parentLeft: WorkspaceEntry
    appendages: string[]
    constructor(matrixLeft: WorkspaceEntry, inParent: Boolean = false, appendages: string[] = []) {
        if (inParent) {
            const a = elemWiseMultiplication(matrixLeft, appendages)
            super(matrixLeft.selection.setForWith(matrixLeft.parent.asList2D, a))
        } else {
            super(elemWiseMultiplication(matrixLeft, appendages))
        }
        this.parentLeft = matrixLeft
        this.appendages = appendages
    }


    getRelative() {
        return getFullParent(this.appendages[0], this.parentLeft)
    }
}

function elemWiseMultiplication(arg1: WorkspaceEntry, appendages: string[]): Array<Array<string>> {
    const xSelect = arg1.selection.getDescription()

    const a1 = getAppengadeByIndex(appendages, 0)

    pyodide.runPython(
        "_mx = numpy.matrix(" + arg1.parent.toString() + ") \n" +
        "result = ensureMatrix((" + a1 + ")* _mx" + xSelect + ")")
    return pyodide.globals.get('result').toJs()
}