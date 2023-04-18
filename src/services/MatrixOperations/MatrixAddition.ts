import { Matrix } from "../Matrix";
import { addition } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixAddition extends NamedMatrix {
    parentLeft: Matrix
    parentRight: Matrix
    constructor(matrixLeft: Matrix, matrixRight: Matrix) {
        super(addition(matrixLeft, matrixRight))
        this.parentLeft = matrixLeft
        this.parentRight = matrixRight
    }


    getRelative() {
        return this.parentLeft.getName() + " + " + this.parentRight.getName()
    }
}