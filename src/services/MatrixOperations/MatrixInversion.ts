import { Matrix } from "../Matrix";
import { inversion } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixInversion extends NamedMatrix {
    parent: Matrix
    constructor(matrix: Matrix) {
        super(inversion(matrix))
        this.parent = matrix
    }


    getRelative() {
        return this.parent.getName() +"^-1"
    }
}