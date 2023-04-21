import { MatrixInvalidError } from "./MatrixErros";
import { pyodide } from "./PyLoader";
import { Matrix } from "./Matrix";
import { MatrixAddition } from "./MatrixOperations/MatrixAddition";
import { MatrixSubstraction } from "./MatrixOperations/MatrixSubstraction";
import { MatrixMultiplication } from "./MatrixOperations/MatrixMultiplication";
import { MatrixTransposition } from "./MatrixOperations/MatrixTransposition";
import { MatrixInversion } from "./MatrixOperations/MatrixInversion";
import { MatrixElemWiseMultiplication } from "./MatrixOperations/MatrixElemWiseMultiplication";
import { NamedMatrix } from "./NamedMatrix";

export function evaluateMathWithPython(expr: string): number {
    const regex = /^[0-9+\-*/^().\s]+$/;
    const isValid = regex.test(expr);
    if (!isValid) {
        throw new MatrixInvalidError("Mathematical expression is unsafe.")
    }

    return pyodide.runPython(expr);
}

export function runFunctionById(id: number, workspace: Array<{parent: NamedMatrix, selected: Array<{ row: number, col: number }> }>): Array<Matrix> {
    switch (id) {
        case 0: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [new MatrixAddition(e1, e2)]
        }
        case 1: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [new MatrixSubstraction(e1, e2)]
        }
        case 2: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [new MatrixMultiplication(e1, e2)]
        }
        case 3: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return [new MatrixTransposition(e1)]
        }
        case 4: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return [new MatrixInversion(e1)]
        }
        case 5: {
            //Replace
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            const res = workspace[0].parent.setElementsBySelection(workspace[0].selected, e2)
            return [new NamedMatrix(res.asList2D)]
        }
        case 6: {
            //Swap
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            const resArr = [workspace[0].parent.setElementsBySelection(workspace[0].selected, e2)]
            if (workspace[0].parent.id !== workspace[1].parent.id) {
                resArr.push(workspace[1].parent.setElementsBySelection(workspace[1].selected, e1))
            } else {
                resArr[0] = resArr[0].setElementsBySelection(workspace[1].selected, e1)
            }
            return resArr.map(x => new NamedMatrix(x.asList2D))
        }
        case 7:
            break
        case 8:
            break
        case 9: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            return [new NamedMatrix([[e1.rowsAmount, e1.columnsAmount]])]
        }
        case 10: {
            const allSelections = workspace.reduce((acc, x) => {
                return acc.parent.id === x.parent.id ?
                    { parentId: acc.parent.id, parent: acc.parent, selected: acc.selected.concat(x.selected) } :
                    acc
            }).selected
            return [new NamedMatrix(workspace[0].parent.extractElemsAsMatrix(allSelections).asList2D)]
        }
        case 16: {
            const e1 = workspace[0].parent.extractElemsAsMatrix(workspace[0].selected)
            const e2 = workspace[1].parent.extractElemsAsMatrix(workspace[1].selected)
            return [new MatrixElemWiseMultiplication(e1, e2)]
        }
    }
    throw new Error("This operation is not implemented yet.")
}

export function addition(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = numpy.add(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function subtraction(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = numpy.subtract(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function multiplication(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result =  numpy.matmul(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function elemWiseMultiplication(arg1: Matrix, arg2: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.globals.set("y", arg2.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "my = numpy.matrix(y) \n" +
        "result = numpy.multiply(mx, my).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function transposition(arg1: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "result = numpy.transpose(mx).tolist()")
    return pyodide.globals.get('result').toJs()
}

export function inversion(arg1: Matrix) {
    pyodide.globals.set("x", arg1.toString())
    pyodide.runPython(
        "mx = numpy.matrix(x) \n" +
        "result = numpy.linalg.inv(mx).tolist()")
    return pyodide.globals.get('result').toJs()
}