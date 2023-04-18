import { Matrix } from "../Matrix";
import { transposition } from "../HelperFunctions";
import { NamedMatrix } from "../NamedMatrix";

export class MatrixTransposition extends NamedMatrix {
    parent: Matrix
    constructor(matrix: Matrix) {
        super(transposition(matrix))
        this.parent = matrix
    }


    getRelative() {
        return "transposed "+ this.parent.getName()
    }
}