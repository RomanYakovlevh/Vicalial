import { NamedMatrix } from "../NamedMatrix";
import { pyodide } from "../PyLoader";
import { WorkspaceEntry } from "../Workspace";

export class MatrixElemWiseMultiplication extends NamedMatrix {
    parentLeft: WorkspaceEntry
    parentRight: WorkspaceEntry
    constructor(matrixLeft: WorkspaceEntry, matrixRight: WorkspaceEntry) {
        super(elemWiseMultiplication(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getDescription() + " .* " + this.parentRight.getDescription()
    }
}

function elemWiseMultiplication(arg1: WorkspaceEntry, arg2: WorkspaceEntry): Array<Array<number>> {
    const xSelect = arg1.selection.getDescription()
    const ySelect = arg2.selection.getDescription()
    pyodide.globals.set('x', arg1.parent.toString())
    pyodide.globals.set('y', arg2.parent.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = ensureMatrix(numpy.multiply(mx" + xSelect + ", my" + ySelect + "))")
    return pyodide.globals.get('result').toJs()
}