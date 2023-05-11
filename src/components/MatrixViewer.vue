<template>
    <table ref="matrix" class="matrix">
        <tr>
            <th v-for="col in matrix.columnsAmount" :key="col">
                <button class="row-col-selector-btn" @click="onColButtonClick(col - 1)" @mouseover="onColMouseOver(col - 1)"
                    @mouseout="onColMouseOut(col - 1)">⏺</button>
            </th>
            <th> <button class="row-col-selector-btn" @click="onAllButtonClick()" @mouseover="onAllMouseOver()"
                    @mouseout="onAllMouseOut()">◼</button>
            </th>
            <th v-if="workspaceVersion === 0">
                <span style="color:#aaa"><v-icon>mdi-arrow-left-thick</v-icon>click!</span>
            </th>
        </tr>
        <tr v-for="(row, rowIndex) in getMatrixAccordingToFormatter()" :key="rowIndex">
            <td v-for="(item, colIndex) in row" :style="cellStyle(rowIndex, colIndex)"
                :key="rowIndex * matrix.columnsAmount + colIndex" @click="onSingleMouseClick(rowIndex, colIndex)"
                @mouseover="onSingleMouseOver(rowIndex, colIndex)" @mouseout="onSingleMouseOut(rowIndex, colIndex)">
                <div class="hld">{{ item }}</div>
            </td>
            <td>
                <button class="row-col-selector-btn" @click="onRowButtonClick(rowIndex)"
                    @mouseover="onRowMouseOver(rowIndex)" @mouseout="onRowMouseOut(rowIndex)">⏺</button>
            </td>
            <td v-if="workspaceVersion === 0">
                <span style="color:#aaa"><v-icon>mdi-arrow-left-thick</v-icon>click!</span>
            </td>
        </tr>
    </table>
</template>

<script>
//import { NamedMatrix } from '@/services/NamedMatrix';
import { Workspace, WorkspaceEntry, ColSelection, RowSelection, CellSelection, AllSelection } from '@/services/Workspace';
import { getFormattedMatrix } from '@/services/HelperFunctions';

export default {
    data() {
        return {
            cellStyles: { rows: [], cols: [], cells: [[]], all: {} }
        };
    },
    props: {
        matrix: {
            required: true
        },
        workspace: {
            type: Workspace,
            required: true
        },
        workspaceVersion: {
            required: true
        }
    },
    created() {
        this.cellStyles = {
            rows: Array(this.matrix.rowsAmount).fill(false).map(() => { return { hover: false, selected: false } }),
            cols: Array(this.matrix.columnsAmount).fill(false).map(() => { return { hover: false, selected: false } }),
            cells: Array(this.matrix.rowsAmount).fill([]).map(() => Array(this.matrix.columnsAmount).fill(false).map(() => { return { hover: false, selected: false } })),
            all: { hover: false, selected: false }
        }
    },
    methods: {
        onRowButtonClick(rowIndex) {
            console.log('Button clicked! ', rowIndex);
            this.$emit("workspacePush", new WorkspaceEntry(this.matrix, new RowSelection(rowIndex)))
        },
        onColButtonClick(colIndex) { //Dunno why but in template in line with <th v-for="col in statement.matrix.columnsAmount" :key="col"> indexing by some reason starts with 1
            //console.log('Button clicked! ', colIndex);
            this.$emit("workspacePush", new WorkspaceEntry(this.matrix, new ColSelection(colIndex)))
        },
        onSingleMouseClick(rowIndex, colIndex) {
            this.$emit("workspacePush", new WorkspaceEntry(this.matrix, new CellSelection(rowIndex, colIndex)))
        },
        onAllButtonClick() {
            // console.log('All Button clicked! ');
            this.$emit("workspacePush", new WorkspaceEntry(this.matrix, new AllSelection()))
        },

        onRowMouseOver(rowIndex) {
            this.$data.cellStyles.rows[rowIndex].hover = true
            //console.log(this.$data.mouseoverRow)
        },
        onRowMouseOut(rowIndex) {
            this.$data.cellStyles.rows[rowIndex].hover = false
            //console.log(this.$data.mouseoverRow)
        },

        onColMouseOver(colIndex) {
            this.$data.cellStyles.cols[colIndex].hover = true
            //console.log(this.$data.mouseoverCol)
        },
        onColMouseOut(colIndex) {
            this.$data.cellStyles.cols[colIndex].hover = false
            //console.log(this.$data.mouseoverCol)
        },

        onAllMouseOver() {
            console.log(this.$data.cellStyles.all)
            this.$data.cellStyles.all.hover = true
            //console.log(this.$data.mouseoverCol)
        },
        onAllMouseOut() {
            console.log(this.$data.cellStyles.all)
            this.$data.cellStyles.all.hover = false
            //console.log(this.$data.mouseoverCol)
        },

        onSingleMouseOver(rowIndex, colIndex) {
            this.$data.cellStyles.cells[rowIndex][colIndex].hover = true
            //console.log(this.$data.mouseOverSingle)
        },
        onSingleMouseOut(rowIndex, colIndex) {
            this.$data.cellStyles.cells[rowIndex][colIndex].hover = false
        },
        selectedStyle() {
            const newVal = this.$props.workspace
            if (newVal instanceof Workspace) {
                this.$data.cellStyles.all.selected = newVal.getSelectedAllFor(this.matrix.id)

                const selectedRows = newVal.getSelectedRowsFor(this.matrix.id)
                for (let i = 0; i < this.$data.cellStyles.rows.length; i++) {
                    this.$data.cellStyles.rows[i].selected = false;
                }
                for (let i = 0; i < selectedRows.length; i++) {
                    const sel = selectedRows[i]
                    this.$data.cellStyles.rows[sel].selected = true;
                }

                const selectedCols = newVal.getSelectedColsFor(this.matrix.id)
                for (let i = 0; i < this.$data.cellStyles.cols.length; i++) {
                    this.$data.cellStyles.cols[i].selected = false;
                }
                for (let i = 0; i < selectedCols.length; i++) {
                    const sel = selectedCols[i]
                    this.$data.cellStyles.cols[sel].selected = true;
                }

                const selectedCells = newVal.getSelectedCellsFor(this.matrix.id)
                for (let i = 0; i < this.$data.cellStyles.cells.length; i++) {
                    const element = this.$data.cellStyles.cells[i];
                    for (let j = 0; j < element.length; j++) {
                        this.$data.cellStyles.cells[i][j].selected = false;
                    }
                }
                for (let i = 0; i < selectedCells.length; i++) {
                    const element = selectedCells[i];
                    this.$data.cellStyles.cells[element.row][element.col].selected = true;
                }
            }
        }
    },
    computed: {
        getMatrixAccordingToFormatter() {
            return () => {
                const r = getFormattedMatrix(this.$store.state.formatStyle, this.matrix)
                return r
            }

        },
        cellStyle() {
            return (rowIndex, colIndex) => {
                //console.log("r: " + rowIndex + " c: " + colIndex + ", all: " + this.$data.cellStyles.all.hover + " row: " + this.$data.cellStyles.rows[rowIndex].hover + " col: " + this.$data.cellStyles.cols[colIndex].hover + " cell: " + this.$data.cellStyles.cells[rowIndex][colIndex].hover)
                if (this.$data.cellStyles.all.selected ||
                    this.$data.cellStyles.rows[rowIndex].selected ||
                    this.$data.cellStyles.cols[colIndex].selected ||
                    this.$data.cellStyles.cells[rowIndex][colIndex].selected) {
                    return {
                        "background-color": "white",
                        border: "1px solid black"
                    };
                } else if (this.$data.cellStyles.all.hover ||
                    this.$data.cellStyles.rows[rowIndex].hover ||
                    this.$data.cellStyles.cols[colIndex].hover ||
                    this.$data.cellStyles.cells[rowIndex][colIndex].hover) {
                    return {
                        "background-color": "grey",
                        border: "1px solid grey"
                    };
                } else {
                    return {
                        "background-color": "white",
                        border: "1px solid white"
                    };
                }
            }
        },
    },
    watch: {
        workspaceVersion: {
            immediate: true,
            handler(nv) {
                console.log("Workspace updated, version: " + nv)
                this.selectedStyle()
            }
        }
    },

    emits: ["workspacePush"]
}

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

.matrix {
    margin: 0% 1% 1% 1%;
    border: 0px solid #999999;
    font-family: 'Roboto Mono', monospace;
    height: fit-content;
    align-self: center;
}

.row-col-selector-btn {
    border: none;
    border-radius: 5px;
    width: 2em;
    height: 2em;
}

.row-col-selector-btn:hover {
    background-color: #d6d5d2;
}

.hld {
    margin: 3px 8px 3px 8px;
}
</style>