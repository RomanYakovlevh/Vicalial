class Matrix {
    private asList2D: any;
    private linesAmount: any;
    private columnsAmount: any;
    constructor(list2D: any) {
        console.log("HIIII")
        this.linesAmount = list2D.length
        this.columnsAmount = list2D[0].length
        const thisLocalized = this;
        console.log(this.linesAmount, this.columnsAmount, thisLocalized.linesAmount, thisLocalized.columnsAmount)
        list2D.forEach(function (x: any) {
            console.log(x)
            if (x.length !== thisLocalized.columnsAmount) {
                throw new MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
        })
        this.asList2D = list2D
    }
}

class MatrixInvalidError extends Error {}

export default {Matrix, MatrixInvalidError};
