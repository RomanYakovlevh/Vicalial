class Matrix {
    constructor(list2D) {
        this.linesAmount = list2D.length
        this.columnsAmount = list2D[0].length
        list2D.forEach(function (x) {
            if (x.length !== this.columnsAmount) {
                throw MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
        })
        this.asList2D = list2D
    }
}

class MatrixInvalidError extends Error {}