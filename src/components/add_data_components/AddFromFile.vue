<template>
    <v-card-subtitle>Upload or drop files in following formats</v-card-subtitle>
    <v-file-input label=".xlsx, .csv"
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        prepend-icon="" variant="underlined" v-model="files"></v-file-input>
    <v-card-actions class="buttons">
        <v-btn class="btn confirm" @click="addNewMatrixAndCloserWindow">Confirm</v-btn>
        <v-btn class="btn cancel" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
</template>

<script>
import { fileToNestedArray } from '@/services/FileWorkers';
import { NamedMatrix } from '@/services/NamedMatrix';
import { evaluateMathWithPython } from '@/services/HelperFunctions';
import { MatrixInvalidError } from '@/services/MatrixErros';

export default {
    name: 'AddFromFile',
    data() {
        return {
            files: []
        }
    },
    methods: {
        async addNewMatrixAndCloserWindow() {
            //TODO refactor, this logic should be in some service

            try {
                let arr = await fileToNestedArray(this.files[0])

                const list2D = arr.map((x) => x.map(y => evaluateMathWithPython(y.toString())))

                const matrix = new NamedMatrix(list2D);

                this.$emit("newStatementAdded", matrix)
                this.$emit("closeDialog")
            } catch (e) {
                if (e instanceof MatrixInvalidError) {
                    this.$data.textValue = "temp: " + e.message
                } else {
                    throw e
                }
            }

        },
        closeDialog() {
            this.$emit('closeDialog')
        }
    },
    emits: ['closeDialog', 'newStatementAdded']
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
</style>