<template>
    <div class="floating-window" v-if=isOpenAddDataWindow>
        <div style="font-size: smaller; text-align: left; padding: 1%;"> Vicalial uses Python to evaluate mathematical expressions. Please use Python syntax when writing an
            expression. For
            example, if you want to write "sum of two and two in a power of three", write "(2 + 2)**3". Do define matrix
            separate elements on a line with "," and move to a new line to define new matrix line. For example: <div style="color: grey; margin-left: 3%;"><br>
            1, 2, 1/3 <br>
            5.5, 7, 6 <br>
            4, 5, -10 <br></div></div>

        <textarea class="txt-box" v-model='textValue'></textarea>
        <div>
            <button class="btn" @click=addNewMatrixAndCloserWindow>Confirm</button>
            <button class="btn" @click=setOpenDataWindow(false)>Cancel</button>
        </div>

    </div>
</template>

<script>
import { Matrix, MatrixInvalidError, evaluateMathWithPython } from "../services/Matrix.ts"

export default {
    name: 'AddDataWindow',
    computed: {
        isOpenAddDataWindow() {
            return this.$store.state.isOpenAddDataWindow
        }
    },
    methods: {
        setOpenDataWindow(value) {
            this.$store.commit('setOpenDataWindow', value)
        },
        addNewMatrixAndCloserWindow() {
            //TODO refactor, this logic should be in some service
            const id = this.$store.state.lastObjectID
            const name = "object " + id
            try {
                const list2D = this.$data.textValue.split('\n').map((x) => x.split(',').map(y => evaluateMathWithPython(y)))

                const matrix = new Matrix(list2D);

                this.$store.commit('incrementLastObjectId')
                this.$emit("newStatementAdded", { id, name, matrix })
                this.setOpenDataWindow(false)
            } catch (e) {
                if (e instanceof MatrixInvalidError) {
                    this.$data.textValue = "temp: " + e.message
                } else {
                    throw e
                }
            }


        }

    },
    data() {
        return {
            textValue: ""
        }
    },
    emits: ['newStatementAdded']
};
</script>

<style scoped>
.floating-window {
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    width: 50%;
    height: 50%;
    border-radius: 10px;
    align-content: flex-end;
    display: flex;
    flex-direction: column;
}

.txt-box {
    height: fit-content;
    max-height: 250px;
    flex-grow: 1;
    margin: 2%;
}

.btn {
    background-color: #ffcd29;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 18px;
    cursor: pointer;
    margin-right: 2%;
    margin-left: 2%;
    margin-bottom: 2%;

}

.btn:hover {
    background-color: #e0ac00;
}
</style>
