<template>
    <v-card>
        <v-card-text>You can export in three different formats</v-card-text>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value=".CSV">.CSV</v-tab>
            <v-tab value=".XLSX">.XLSX</v-tab>
            <v-tab value=".LaTeX">.LaTeX</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value=".CSV">
                    <v-card variant="outlined">
                        <v-card-text class="data-display">
                            <pre class="roboto-mono">{{ nestedArrayToCSV(matrix) }}
                            </pre>
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value=".XLSX">
                    <v-card variant="outlined">
                        <v-card-text class="data-display">
                            <pre class="roboto-mono">Preview unavailable.
                            </pre>
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value=".LaTeX">
                    <v-card variant="outlined">
                        <v-card-text class="data-display">
                            <pre class="roboto-mono">{{ nestedArrayToLaTex(matrix) }}
                            </pre>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-card-text>
        <v-card-actions class="buttons">
            <v-btn class="btn cancel" @click="closeDialog">Close</v-btn>
            <v-btn @click="exportInChosen(matrix)">Download</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { exportExcel, exportToCSV, exportToLaTeX, nestedArrayToCSV, nestedArrayToLaTex } from '@/services/FileWorkers';

export default {
    name: "ExportMatrix",
    components: {
    },
    props: {
        matrix: { type: Array, require: true }
    },
    data: () => ({
        tab: null,
    }),
    methods: {
        exportInChosen(matrix) {
            if (this.tab === ".CSV") {
                exportToCSV(matrix)
            } else if (this.tab === ".XLSX") {
                exportExcel(matrix)
            } else if (this.tab === ".LaTeX"){
                exportToLaTeX(matrix)
            } else {
                console.log('Error in ExportMatrix.ts: chosen tab is not in the list.')
                exportToCSV(matrix)
            }
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        exportExcel(argument) {
            return exportExcel(argument)
        },
        exportToCSV(argument) {
            return exportToCSV(argument)
        },
        exportToLaTeX(argument) {
            return exportToLaTeX(argument)
        },
        nestedArrayToCSV(argument) {
            return nestedArrayToCSV(argument)
        },
        nestedArrayToLaTex(argument) {
            return nestedArrayToLaTex(argument)
        }
    },
    emits: ['closeDialog']
}

</script>

<style scoped lang="scss">
.roboto-mono {
    font-family: 'Roboto Mono', monospace;
}
</style>