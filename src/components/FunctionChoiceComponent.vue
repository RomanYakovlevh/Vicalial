<template>
    <div class="tabs">
        <div class="tab-buttons">
            <button v-for="(tab, index) in tabs" :key="index" @click="this.activeTabIndex = index"
                :class="{ active: index === activeTabIndex }">{{ tab.title }}</button>
        </div>
        <div class="tab-contents">
            <div v-for="(tab, index) in   tabs  " :key="index" v-show="isTabActive(index)"
                :class="{ active: index === activeTabIndex }">
                <div class="function-buttons">
                    <button class="function-button" v-for="(op, j) in   tab.content  " :key="j"
                        @click="activeFunctionChoiceIndex = op.id; error = ''">
                        {{ op.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <v-card class="error-msg" v-if=" error !== '' ">Calculation is impossible.
            <button class="apply-button" @click=" showMoreInfoAboutErrorDialog = true ">More</button> <button class="apply-button"
                @click=" error = '' ">✖</button></v-card>
        <v-dialog v-model=" showMoreInfoAboutErrorDialog " width="auto">
            <v-card>
                <v-card-text>{{ error }}</v-card-text>
                <v-card-actions>
                    <button class="apply-button" @click=" showMoreInfoAboutErrorDialog = false ">Close</button>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div v-if=" activeFunctionChoiceIndex !== -1 " class="fun-arg-sel">
            <h3>{{ allFunctions.find(x => x.id === activeFunctionChoiceIndex).name }}:</h3>
            <div class="function-arguments">
                <div v-for="  i   in   Array.from({ length: allFunctions.find(x => x.id === activeFunctionChoiceIndex).argNum }, (_, index) => index)  "
                    :key=" i ">
                    {{ this.pullFromWorkspace(i) }},
                </div>
            </div>
            <button v-show=" allFunctions.find(x => x.id === activeFunctionChoiceIndex).argNum <= workspace.length "
                @click=" runFunction() " class="apply-button">Apply</button>
        </div>
    </div>
    <v-dialog v-model="exportMatrixDialog" width="auto"> 
        <ExportMatrix @close-dialog="exportMatrixDialog = false" :matrix="selectFormatted()"></ExportMatrix>
    </v-dialog>
</template>
  
<script>
import { runFunctionById, getFormattedMatrix } from '@/services/HelperFunctions'
import ExportMatrix from './ExportMatrix.vue'
import { MatrixSelection } from '@/services/MatrixOperations/MatrixSelection'

export default {
    name: "FunctionChoiceComponent",
    props: {
        workspace: { require: true, type: Array }
    },
    components: {
        ExportMatrix
    },
    methods: {
        pullFromWorkspace(i) {
            if (i < this.$props.workspace.length) {
                return "s" + i
            } else {
                return "-"
            }
        },
        selectFormatted() {
            const matrix = new MatrixSelection(this.workspace[0].parent, this.workspace[0].selected, true)
            return getFormattedMatrix(this.$store.state.formatStyle, matrix)
        },
        runFunction() {

            if (this.$data.activeFunctionChoiceIndex === 12) {
                this.exportMatrixDialog = true
            } else {
                try {
                    runFunctionById(this.$data.activeFunctionChoiceIndex, this.$props.workspace).forEach(matrix => {
                        this.$store.commit('incrementLastObjectId')
                        this.$emit("newStatementAdded", matrix)
                    })
                    this.$emit("workspaceUpdate", [])
                } catch (e) {
                    this.error = e.toString()
                }
            }

        },
    },
    data() {
        return {
            activeTabIndex: 0,
            activeFunctionChoiceIndex: -1,
            error: "",
            showMoreInfoAboutErrorDialog: false,
            exportMatrixDialog: false,
            allFunctions: [{ id: 0, shorthand: "+", name: "Addition", argNum: 2 },
            { id: 1, shorthand: "-", name: "Subtraction", argNum: 2 },
            { id: 2, shorthand: "*", name: "Multiplication", argNum: 2 },
            { id: 3, shorthand: "T", name: "Transposition", argNum: 1 },
            { id: 4, shorthand: "^-1", name: "Inversion", argNum: 1 },
            { id: 5, shorthand: "+", name: "Replace", argNum: 2 },
            { id: 6, shorthand: "-", name: "Swap", argNum: 2 },
            { id: 7, shorthand: "*", name: "Map", argNum: 2 },
            { id: 8, shorthand: "T", name: "Fold", argNum: 2 },
            { id: 9, shorthand: "^-1", name: "Size", argNum: 1 },
            { id: 10, shorthand: "+", name: "Selection", argNum: 0 }, //Technically it should be infinity, but we dont support that yet
            { id: 11, shorthand: "+", name: "Plot", argNum: 1 },
            { id: 12, shorthand: "-", name: "Export", argNum: 1 },
            { id: 15, shorthand: "^-1", name: "To Abstract", argNum: 1 },
            { id: 16, shorthand: "*", name: "Element-wise product", argNum: 2 }]
        };
    },
    computed: {
        isTabActive() {
            return (index) => {
                return index === this.activeTabIndex;
            };
        },
        tabs() {
            return [
                {
                    title: "Math",
                    content: this.allFunctions.filter((x) => new Array(0, 1, 2, 3, 4, 16).findIndex(y => y === x.id) !== -1),
                },
                {
                    title: "Code",
                    content: this.allFunctions.filter((x) => new Array(5, 6, 7, 8, 9, 10).findIndex(y => y === x.id) !== -1),
                },
                {
                    title: "Other",
                    content: this.allFunctions.filter((x) => new Array(11, 12, 15).findIndex(y => y === x.id) !== -1),
                },
            ]
        }
    },
    emits: ['newStatementAdded', 'workspaceUpdate', 'error']
}
</script>
  
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

.error-msg {
    padding: 5px;
    border: 4px solid red;
    font-family: 'Roboto Mono', monospace;
    font-size: small;
}

.apply-button {
    border: none;
    border-radius: 5px;
    background-color: #ffcd29;
    color: #000;
    font-size: small;
    font-weight: bold;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #e0ac00;
    }
}

.tabs {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    height: 100%;
    padding: 5px;
    border-radius: 10px;
    font-size: small;

    .tab-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;

        button {
            border: none;
            background-color: transparent;
            padding: 8px 12px;
            margin-right: 10px;
            cursor: pointer;

            &:hover {
                transform: scale(1.05);
                background-color: #e2e2e2;
                border-radius: 10px;
            }

            &.active {
                background-color: #444444;
                color: white;
                border-radius: 10px;
            }
        }
    }

    .tab-contents {
        width: 100%;

        >div:not(.active) {
            display: none;
        }

        >div:first-child {
            display: block;
        }

        .function-buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: white;
            border-radius: 10px;
        }

        .function-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50px;
            margin: 5px;
            padding: 0 10px;
            border: none;
            border-radius: 5px;
            background-color: #f2f2f2;
            color: #444;
            font-size: small;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

        }

        .function-button:hover {
            transform: scale(1.05);
            background-color: #e2e2e2;
        }

        .function-button:active {
            transform: scale(0.95);
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .function-button.selected {
            background-color: #007bff;
            color: white;
        }
    }

    .fun-arg-sel {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;

        h3 {
            margin-bottom: 10px;
            font-size: medium;
            font-weight: bold;
        }

        .function-arguments {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            font-size: small;

            div {
                margin: 0 5px;
            }
        }


    }

}
</style>
  