<template>
    <v-card-subtitle>Upload or drop files in following formats</v-card-subtitle>
    <v-file-input label=".xlsx .txt .csv .json .tex"
        accept=".csv, .txt, .json, .tex, .latex, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        prepend-icon="" variant="underlined" v-model="files"></v-file-input>
    <v-card-actions class="buttons">
        <v-btn class="btn confirm" @click="addNewMatrixAndCloserWindow">Confirm</v-btn>
        <v-btn class="btn cancel" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
</template>

<script>
import Papa from 'papaparse';
import ExcelJS from 'exceljs';

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
            let r
            (await this.files.map(async (x) => {

                const fileType = x.type

                if (fileType === 'text/csv') {
                    // handle CSV file
                    let res = ""

                    await Papa.parse(x, {
                        complete: (results) => {
                            console.log(results.data);
                            // results.data is an array of arrays, where each inner array represents a row of the CSV file
                            res = results
                        },
                        header: false, // if the CSV file has a header row, set this to true to convert each row to an object with keys corresponding to the header columns
                    });
                    return res

                } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    console.log('Started xlsx: ' + x)
                    // handle Excel file
                    // Load the workbook from file
                    const workbook = new ExcelJS.Workbook();
                    await workbook.xlsx.load(x);

                    // Get the first worksheet
                    const worksheet = workbook.worksheets[0];

                    // Convert worksheet data to JSON
                    const data = worksheet.getSheetValues().slice(1).map(row => row.slice(1));

                    console.log(data); // Your JSON data
                    return data
                } else if (fileType === 'application/json') {
                    // handle JSON file
                } else if (fileType === "application/x-tex") {
                    // handle other file types
                }
                return ""
            }))[0].then(x => {
                r = x
                console.log("r: " + r)
            })

            /*
                        try {
                const list2D = this.$data.textValue.split('\n').map((x) => x.split(',').map(y => evaluateMathWithPython(y)))

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
            */




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