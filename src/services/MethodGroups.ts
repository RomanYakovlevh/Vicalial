export interface MatrixMethodGroups { }

export class MathMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new AddMethod, new SubtractMethod, new MultiplyMethod, new TransposeMethod, new InverseMethod]
        this.rest = [new MultiplyByConstant, new ElementWiseProductMethod, new LinearProgrammingMinimizeMethod]
    }

    all() {
        return this.rest.concat(this.top)
    }
}

export class CodeMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new ReplaceMethod, new SwapMethod, new SizeMethod, new SelectMethod/*, new SliceMethod*/]
        this.rest = [new AppendRowsMethod, new AppendColumnsMethod]
    }

    all() {
        return this.rest.concat(this.top)
    }
}

export class OtherMethodGroup implements MatrixMethodGroups {
    top: Array<MatrixMethod>
    rest: Array<MatrixMethod>
    constructor() {
        this.top = [new PlotMethod, new ExportMethod, new SetBackgroundColorMethod]
        this.rest = []
    }

    all() {
        return this.rest.concat(this.top)
    }
}