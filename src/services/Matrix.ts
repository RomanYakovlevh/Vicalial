class Matrix {
    private asList2D: any;
    private linesAmount: any;
    private columnsAmount: any;
    constructor(list2D) {
        this.linesAmount = list2D.length
        this.columnsAmount = list2D[0].length
        list2D.forEach(function (x) {
            const {columnsAmount} = this;
            if (x.length !== columnsAmount) {
                throw new MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
        })
        this.asList2D = list2D
    }
}

class MatrixInvalidError extends Error {}