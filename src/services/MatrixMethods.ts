import { ErrorTypes } from "vue-router"

export interface MatrixMethodGroups {}

export class MathMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new AddMethod, new SubtractMethod, new MultiplyMethod,new TransposeMethod,new InverseMethod]
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
}

export class AddMethod implements MatrixMethod {
    name(): string {
        return "Add"
    }
}

export class SubtractMethod implements MatrixMethod {
    name(): string {
        return "Subtract"
    }
}

export class MultiplyMethod implements MatrixMethod {
    name(): string {
        return "Multiply"
    }
}

export class TransposeMethod implements MatrixMethod {
    name(): string {
        return "Transpose"
    }
}

export class InverseMethod implements MatrixMethod {
    name(): string {
        return "Inverse"
    }
}

export class ElementWiseProductMethod implements MatrixMethod {
    name(): string {
        return "Element-Wise Product"
    }
}

export class ReplaceMethod implements MatrixMethod {
    name(): string {
        return "Replace"
    }
}

export class SwapMethod implements MatrixMethod {
    name(): string {
        return "Swap"
    }
}

export class SizeMethod implements MatrixMethod {
    name(): string {
        return "Size"
    }
}

export class SelectMethod implements MatrixMethod {
    name(): string {
        return "Select"
    }
}

export class SliceMethod implements MatrixMethod {
    name(): string {
        return "Slice"
    }
}

export class AppendRowsMethod implements MatrixMethod {
    name(): string {
        return "Append Rows"
    }
}

export class AppendColumnsMethod implements MatrixMethod {
    name(): string {
        return "Append Columns"
    }
}

export class PlotMethod implements MatrixMethod {
    name(): string {
        return "Plot"
    }
}

export class ExportMethod implements MatrixMethod {
    name(): string {
        return "Export"
    }
}
