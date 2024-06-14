//Temporary crutch, intil we invent good type system.
import { Matrix } from "./Matrix";
import {getLastmatrixId, incrementLastMatrixId} from "@/services/LastMatrixIdStatic";

export class NamedMatrix extends Matrix {
    id: number;
    name: string;
    type: string
    constructor(list2D: Array<Array<string>>, supressed: boolean = false) {
        super(list2D)
        if (!supressed) {
            this.id = getLastmatrixId()
            incrementLastMatrixId()
        } else {
            this.id = -1
        }
        this.name = "M" + this.id
        this.type = 'NamedMatrix'
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