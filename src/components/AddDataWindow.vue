<template>
    <div class="floating-window" v-if=isOpenAddDataWindow>
        <textarea class="txt-box" v-model='textValue'></textarea>
        <div>
            <button class="btn" @click=addNewMatrixAndCloserWindow>Confirm</button>
            <button class="btn" @click=setOpenDataWindow(false)>Cancel</button>
        </div>

    </div>
</template>

<script>
import { Matrix, MatrixInvalidError } from "../services/Matrix.js"

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
            const name = "object" + id
            try {
                const matrix = new Matrix(this.$data.textValue.split('\n').map((x) => x.split(',')));

                this.$emit("newDataAdded", { id, name, matrix })
                this.$store.commit('incrementLastObjectId')
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
    emits: ['newDataAdded']
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
    width: 400px;
    height: 300px;
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
