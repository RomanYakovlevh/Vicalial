<template>
    <div class="floating-window" v-if="isOpenAddDataWindow">
        <div class="message">
            Vicalial uses Python to evaluate mathematical expressions. Please use Python syntax when writing an expression.
            For example, if you want to write "sum of two and two in a power of three", write "(2 + 2)**3". To define a
            matrix, separate elements on a line with "," and move to a new line to define a new matrix line. For example:
            <br /><br />
            <code>1, 2, 1/3<br />5.5, 7, 6<br />4, 5, -10</code>
        </div>
        <textarea class="txt-box" v-model="textValue"></textarea>
        <div class="buttons">
            <button class="btn confirm" @click="addNewMatrixAndCloserWindow">Confirm</button>
            <button class="btn cancel" @click="setOpenDataWindow(false)">Cancel</button>
        </div>
    </div>
</template>

<script>
import { evaluateMathWithPython } from "@/services/HelperFunctions";
import { NamedMatrix } from "@/services/NamedMatrix";
import { MatrixInvalidError } from "@/services/MatrixErros";

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
            try {
                const list2D = this.$data.textValue.split('\n').map((x) => x.split(',').map(y => evaluateMathWithPython(y)))

                const matrix = new NamedMatrix(list2D);

                this.$emit("newStatementAdded", matrix)
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

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
.floating-window {
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    width: 80%;
    height: auto;
    max-height: 80%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    .message {
        font-size: 14px;
        margin: 1rem;
        overflow: auto;
        flex-grow: 1;
        white-space: pre-wrap;
    }

    .txt-box {
        height: 300px;
        width: 100%;
        font-family: 'Roboto Mono', monospace;
        font-size: 16px;
        line-height: 1.5;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        resize: none;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        margin: 1rem;

        .btn {
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 18px;
            cursor: pointer;
            margin-right: 0.5rem;
            font-family: Avenir, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;

            &.confirm {
                background-color: #ffcd29;
                color: black;
            }

            &.cancel {
                background-color: #ffcd29;
                color: white;
                border: 1px solid white;
            }

            &:hover {
                background-color: #e0ac00;
            }
        }
    }
}
</style>