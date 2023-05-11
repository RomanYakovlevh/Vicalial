<template>
    <v-card>
        <v-card-text class="message">
            Here you can define matrices and simple mathematical expressions. To define a
            matrix, separate elements on a line with "," and move to a new line to define a new matrix line.
        </v-card-text>
        <v-textarea label="Enter matrix or extression" variant="outlined" v-model="textValue"></v-textarea>
        <v-card-actions class="buttons">
            <v-btn class="btn confirm" @click="addNewMatrixAndCloserWindow">Confirm</v-btn>
            <v-btn class="btn cancel" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { evaluateMathWithPython } from "@/services/HelperFunctions";
import { NamedMatrix } from "@/services/NamedMatrix";
//import { MatrixInvalidError } from "@/services/MatrixErros";

export default {
    name: 'AddAnyExpression',
    methods: {
        addNewMatrixAndCloserWindow() {
            //TODO refactor, this logic should be in some service
            try {
                const list2D = this.$data.textValue.replace(/\^/g, "**").split('\n').map((x) => x.split(',').map(y => evaluateMathWithPython(y)))

                const matrix = new NamedMatrix(list2D);

                this.$emit("newStatementAdded", matrix)
                this.$emit("closeDialog")
            } catch (e) {
                console.log(e.message)
                this.$store.commit('setOpenSnackBar', {title: 'Invalid matrix', moreInfo: "" + e.message, kind: 'Error'})
                /*
                                if (e instanceof MatrixInvalidError) {
                    //this.$data.textValue = "temp: " + e.message

                } else {
                    throw e
                }
                */

            }


        },
        closeDialog() {
            this.$emit('closeDialog')
        }

    },
    data() {
        return {
            textValue: "",
            palceholder: `Example: 
            1, 2, 1/3
            5.5, 7, 6
            4, 5, -10
            `
        }
    },
    emits: ['closeDialog', 'newStatementAdded']
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
</style>