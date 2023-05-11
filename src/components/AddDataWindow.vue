<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="Any expression">Any expression</v-tab>
            <v-tab value="From file">From file</v-tab>
            <v-tab value="Generator">Generator</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="Any expression">
                    <AddAnyExpression @close-dialog="closeDialog" @new-statement-added="newStatementAdded" />
                </v-window-item>

                <v-window-item value="Manual input">
                    Manual input
                </v-window-item>

                <v-window-item value="From file">
                    <AddFromFile @close-dialog="closeDialog" @new-statement-added="newStatementAdded" />
                </v-window-item>

                <v-window-item value="Generator">
                    <v-card>
                        <v-card-subtitle>Choose one of the generators, and sepcify dimensions of the
                            result.</v-card-subtitle>
                        <div class="d-flex flex-row">
                            <v-text-field v-model="dim1" class="ma-2" label="Height"></v-text-field><v-text-field
                                v-model="dim2" class="ma-2" label="Width"></v-text-field>
                        </div>

                        <v-tabs v-model="text" bg-color="primary">
                            <v-tab value="Ones">Ones</v-tab>
                            <v-tab value="Zeros">Zeros</v-tab>
                            <v-tab value="Eye">Eye</v-tab>
                            <v-tab value="Range">Range</v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-window v-model="text">
                                <v-window-item value="Ones">
                                    <MatrixPreview :matrix="ones(dim1, dim2)"></MatrixPreview>
                                </v-window-item>
                                <v-window-item value="Zeros">
                                    <MatrixPreview :matrix="zeros(dim1, dim2)"></MatrixPreview>
                                </v-window-item>
                                <v-window-item value="Eye">
                                    <MatrixPreview :matrix="eye(dim1, dim2)"></MatrixPreview>
                                </v-window-item>
                                <v-window-item value="Range">
                                    <MatrixPreview :matrix="range(dim1, dim2)"></MatrixPreview>
                                </v-window-item>
                            </v-window>
                        </v-card-text>

                        <v-card-actions class="buttons">
                            <v-btn class="btn confirm" @click="addNewMatrixAndCloserWindow">Confirm</v-btn>
                            <v-btn class="btn cancel" @click="closeDialog">Cancel</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script>
import AddAnyExpression from './AddAnyExpression.vue'
import AddFromFile from './AddFromFile.vue';
import MatrixPreview from './MatrixPreview.vue';

export default {
    name: "AddDataWindow",
    components: {
        AddAnyExpression,
        AddFromFile,
        MatrixPreview
    },
    data: () => ({
        tab: null,
        dim1: "3",
        dim2: "3",
        text: null
    }),
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        },
        newStatementAdded(statement) {
            this.$emit('newStatementAdded', statement)
        },
        ones(h, w) {
            return Array(h).map(() => {
                return Array(w).fill(1)
            })
        },
        zeros(h, w) {
            return Array(h).map(() => {
                return Array(w).fill(0)
            })
        },
        eye(h, w) {
            return Array(h).map((x, i) => {
                x;
                return Array(w).map((y, j) => {
                    y;
                    if (i === j) {
                        return 1
                    } else {
                        return 0
                    }
                })
            })
        },
        range(h, w) {
            return Array(h).map(() => {
                return Range(w)
            })
        }
    },
    emits: ['closeDialog', 'newStatementAdded']
}

</script>

<style scoped lang="scss"></style>