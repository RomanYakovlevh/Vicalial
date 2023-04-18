import { Matrix } from "../Matrix";
import { multiplication } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixMultiplication extends NamedMatrix {
    parentLeft: Matrix
    parentRight: Matrix
    constructor(matrixLeft: Matrix, matrixRight: Matrix) {
        super(multiplication(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getName() + " * " + this.parentRight.getName()
    }
}