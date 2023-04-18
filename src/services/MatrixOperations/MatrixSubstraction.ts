import { Matrix } from "../Matrix";
import { subtraction } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixSubstraction extends NamedMatrix {
    parentLeft: Matrix
    parentRight: Matrix
    constructor(matrixLeft: Matrix, matrixRight: Matrix) {
        super(subtraction(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getName() + " - " + this.parentRight.getName()
    }
}