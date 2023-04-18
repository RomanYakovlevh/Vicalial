import { Matrix } from "../Matrix";
import { elemWiseMultiplication } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixElemWiseMultiplication extends NamedMatrix {
    parentLeft: Matrix
    parentRight: Matrix
    constructor(matrixLeft: Matrix, matrixRight: Matrix) {
        super(elemWiseMultiplication(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getName() + " .+ " + this.parentRight.getName()
    }
}