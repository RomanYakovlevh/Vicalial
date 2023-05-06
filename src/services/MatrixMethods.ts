
import { Workspace } from "./Workspace"
import { Matrix } from "./Matrix"
import { MatrixSelection } from "./MatrixOperations/MatrixSelection"
import { MatrixAddition } from "./MatrixOperations/MatrixAddition"
import { pyodide } from "./PyLoader"
import { MatrixSubstraction } from "./MatrixOperations/MatrixSubstraction"
import { MatrixMultiplication } from "./MatrixOperations/MatrixMultiplication"
import { MatrixTransposition } from "./MatrixOperations/MatrixTransposition"
import { MatrixInversion } from "./MatrixOperations/MatrixInversion"
import { MatrixElemWiseMultiplication } from "./MatrixOperations/MatrixElemWiseMultiplication"
import { MatrixReplace } from "./MatrixOperations/MatrixReplace"
import { MatrixSwap } from "./MatrixOperations/MatrixSwap"
import { MatrixSize } from "./MatrixOperations/MatrixSize"

export interface MatrixMethodGroups { }

export class MathMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new AddMethod, new SubtractMethod, new MultiplyMethod, new TransposeMethod, new InverseMethod]
        this.rest = [new ElementWiseProductMethod]
    }

    all() {
        return this.top.concat(this.rest)
    }
}

export class CodeMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new ReplaceMethod, new SwapMethod, new SizeMethod, new SelectMethod, new SliceMethod]
        this.rest = [new AppendRowsMethod, new AppendColumnsMethod]
    }

    all() {
        return this.top.concat(this.rest)
    }
}

export class OtherMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new PlotMethod, new ExportMethod]
        this.rest = []
    }

    all() {
        return this.top.concat(this.rest)
    }
}

export interface MatrixMethod {
    name(): string

    desription(): string

    arguments(): { selections: number, replaceInParent: Boolean, mutateSelf: Boolean }

    symbol(): {type: number, value: string} // 0 - stands for prefix, 1 - midfx (only for 2 args), 2 - postfix

    execute(workspace: Workspace): Array<Matrix>
}

export class AddMethod implements MatrixMethod {
    name(): string {
        return "Add"
    }

    desription(): string {
        return "Adds two matrices/selections of compatible size."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: true, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 1, value: "+"}
    }

    execute(workspace: Workspace): Array<Matrix> {
        return [new MatrixAddition(workspace.list[0], workspace.list[1])]
    }
}

export class SubtractMethod implements MatrixMethod {
    name(): string {
        return "Subtract"
    }

    desription(): string {
        return "Subtracts two matrices/selections of compatible size."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: true, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 1, value: "-"}
    }

    execute(workspace: Workspace): Array<Matrix> {
        return [new MatrixSubstraction(workspace.list[0], workspace.list[1])]
    }
}

export class MultiplyMethod implements MatrixMethod {
    name(): string {
        return "Multiply"
    }

    desription(): string {
        return "Multiplies two matrices/selections of compatible size."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: false }
    }

    symbol(): { type: number; value: string } {
        return {type: 1, value: "*"}
    }

    execute(workspace: Workspace): Array<Matrix> {
        return [new MatrixMultiplication(workspace.list[0], workspace.list[1])]
    }
}

export class TransposeMethod implements MatrixMethod {
    name(): string {
        return "Transpose"
    }

    desription(): string {
        return "Transposes matrix or selection."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 1, replaceInParent: false, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 2, value: "^T"}
    }

    execute(workspace: Workspace): Matrix[] {
        return [new MatrixTransposition(workspace.list[0])]
    }
}

export class InverseMethod implements MatrixMethod {
    name(): string {
        return "Inverse"
    }

    desription(): string {
        return "Inverses square matrix or selection."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 1, replaceInParent: false, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 2, value: "^-1"}
    }

    execute(workspace: Workspace): Matrix[] {
        return [new MatrixInversion(workspace.list[0])]
    }
}

export class ElementWiseProductMethod implements MatrixMethod {
    name(): string {
        return "Element-Wise Product"
    }

    desription(): string {
        return "Multiplies element-wise two matrices/selections of compatible size."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: true, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 1, value: ".*"}
    }

    execute(workspace: Workspace): Array<Matrix> {
        return [new MatrixElemWiseMultiplication(workspace.list[0], workspace.list[1])]
    }
}

export class ReplaceMethod implements MatrixMethod {
    name(): string {
        return "Replace"
    }

    desription(): string {
        return "Replaces selection from first argument with selection from second argument. Returns whole parent of first selection with replacement."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "replace"}
    }

    execute(workspace: Workspace): Matrix[] {
        return [new MatrixReplace(workspace.list[0], workspace.list[1])]
    }
}

export class SwapMethod implements MatrixMethod {
    name(): string {
        return "Swap"
    }

    desription(): string {
        return "Swaps places of selections from first and second argument."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: true }
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "swap"}
    }

    execute(workspace: Workspace): Matrix[] {
        if (workspace.list[0].parent.id !== workspace.list[1].parent.id) {
            return [new MatrixReplace(workspace.list[0], workspace.list[1]), new MatrixReplace(workspace.list[1], workspace.list[0])]
        } else {
            return [new MatrixSwap(workspace.list[0], workspace.list[1])]
        }
    }
}

export class SizeMethod implements MatrixMethod {
    name(): string {
        return "Size"
    }

    desription(): string {
        return "Returns 1-by-2 matrix where left element equals to amount of rows in selection/matrix, and right element is equal to amount of columns."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 1, replaceInParent: false, mutateSelf: false }
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "size of"}
    }

    execute(workspace: Workspace): Matrix[] {
        return [new MatrixSize(workspace.list[0])]
    }
}

export class SelectMethod implements MatrixMethod {
    name(): string {
        return "Select"
    }

    desription(): string {
        return "Takes any amount of selections as arguments, as long as they all are from the same matrix, and returns new matrix made out of these selections."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: -1, replaceInParent: false, mutateSelf: true } //-1 stands for infinity
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "select"}
    }

    execute(workspace: Workspace): Matrix[] {
        return [new MatrixSelection(workspace.list)]
    }
}

export class SliceMethod implements MatrixMethod {
    name(): string {
        return "Slice"
    }

    desription(): string {
        return "Takes two arguments, both of them single-element selections from same matrix. Returns new matrix with all elements that were between selected elements, including selected elements themselves."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: true } // 
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "slice"}
    }
}

export class AppendRowsMethod implements MatrixMethod {
    name(): string {
        return "Append Rows"
    }

    desription(): string {
        return "Appends sideways two matrices/selections of same row amount."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: true } // 
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "append rows"}
    }
}

export class AppendColumnsMethod implements MatrixMethod {
    name(): string {
        return "Append Columns"
    }

    desription(): string {
        return "Appends vertically two matrices/selections of same columns amount."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: true } // 
    }


    symbol(): { type: number; value: string } {
        return {type: 0, value: "append columns"}
    }
}

export class PlotMethod implements MatrixMethod {
    name(): string {
        return "Plot"
    }

    desription(): string {
        return "Plots matrix/selection."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 1, replaceInParent: false, mutateSelf: false } // 
    }


    symbol(): { type: number; value: string } {
        return {type: 0, value: "plot"}
    }
}

export class ExportMethod implements MatrixMethod {
    name(): string {
        return "Export"
    }

    desription(): string {
        return "Allows to export matrix or selection in downloadable formats."
    }
    
    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 1, replaceInParent: false, mutateSelf: false } // 
    }


    symbol(): { type: number; value: string } {
        return {type: 0, value: "export"}
    }
}

export const allMethodGroups = { math: new MathMethodGroup, code: new CodeMethodGroup, other: new OtherMethodGroup }

export function findFunctionByName(name: string) {
    const allf = allMethodGroups.math.all().concat(allMethodGroups.code.all()).concat(allMethodGroups.other.all())

    return allf.find(x => x.name() === name)
}