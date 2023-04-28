//Temporary crutch, intil we invent good type system.
import { Matrix } from "./Matrix";

let lastMatrixId = 0

export class NamedMatrix extends Matrix {
    id: number;
    name: string;
    constructor(list2D: Array<Array<number>>, name: string | undefined = undefined) {
        super(list2D)
        this.id = lastMatrixId
        lastMatrixId++
        this.name = name === undefined ? "object " + this.id : name
    }

    getName() {
        return this.name
    }


    getRelative() {
        return ""
    }

    equals(arg1: Matrix) {
        if (arg1 instanceof NamedMatrix) {
            return this.id === arg1.id
        } else {
            return super.equals(arg1)
        }
    }


    changeNameUnsafe(newName: string) {
        this.name = newName
    }

}