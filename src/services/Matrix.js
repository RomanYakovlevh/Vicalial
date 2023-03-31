export class Matrix {
    constructor(list2D) {
        console.log("HIIII")
        this.linesAmount = list2D.length
        this.columnsAmount = list2D[0].length
        const thisLocalized = this;
        console.log(this.linesAmount, this.columnsAmount, thisLocalized.linesAmount, thisLocalized.columnsAmount)
        list2D.forEach(function (line) {
            console.log(line)
            if (line.length !== thisLocalized.columnsAmount) {
                throw new MatrixInvalidError("Matrix has inconsistent amount of elements in rows")
            }
            line.forEach(function(item) {
                if (isNaN(Number(item))) {
                    throw new  MatrixInvalidError("Matrix has non-numeric elements")
                }
            })
        })
        this.asList2D = list2D
    }
}

export class MatrixInvalidError extends Error {}