<template>
    <div class="holder">
        <button class="st-cmp-del-button" @click="deleteStatementAndWorkspaceEntries">✖</button>
        <div class="stt">{{ statement.name }} =</div>
        <table ref="matrix" class="matrix">
            <tr>
                <th v-for="col in statement.matrix.columnsAmount" :key="col">
                    <button class="row-col-selector-btn" @click="onColButtonClick(col - 1)"
                        @mouseover="onColMouseOver(col - 1)" @mouseout="onColMouseOut()">⏺</button>
                </th>
                <th> <button class="row-col-selector-btn" @click="onAllButtonClick()" @mouseover="onAllMouseOver()"
                        @mouseout="onAllMouseOut()">◼</button></th>
            </tr>
            <tr v-for="(row, rowIndex) in statement.matrix.asList2D" :key="rowIndex">
                <td v-for="(item, colIndex) in row" :style="cellStyle(rowIndex, colIndex)"
                    :key="rowIndex * statement.matrix.columnsAmount + colIndex"
                    @click="onSingleMouseClick(rowIndex, colIndex)" @mouseover="onSingleMouseOver(rowIndex, colIndex)"
                    @mouseout="onSingleMouseOut()">
                    <div class="hld">{{ item }}</div>
                </td>
                <td>
                    <button class="row-col-selector-btn" @click="onRowButtonClick(rowIndex)"
                        @mouseover="onRowMouseOver(rowIndex)" @mouseout="onRowMouseOut()">⏺</button>
                </td>
            </tr>
        </table>
        <FunctionChoiceComponent v-if="workspace.filter(x => x.parentId === statement.id).length !== 0"
            :workspace="workspace" @new-statement-added="newStatementAdded">
        </FunctionChoiceComponent>
    </div>
</template>
  
<script>
import FunctionChoiceComponent from "@/components/FunctionChoiceComponent.vue"

export default {
    name: 'StatementComponent',
    data() {
        return {
            mouseoverRow: -1,
            mouseoverCol: -1,
            mouseoverAll: false,
            mouseOverSingle: { row: -1, col: -1 }
        };
    },
    components: {
        FunctionChoiceComponent
    },
    methods: {
        deleteStatementAndWorkspaceEntries() {
            const newWorkspace = this.$props.workspace.filter(x => x.parentId !== this.statement.id)
            this.$emit("workspaceUpdate", newWorkspace)
            this.$emit("statementDeleted", this.statement.id)
        },
        onRowButtonClick(rowIndex) {
            console.log('Button clicked! ', rowIndex);
            var selected = []
            for (var i = 0; i < this.statement.matrix.columnsAmount; i++) {
                selected.push({ row: rowIndex, col: i })
            }
            const newWorkspace = [...this.$props.workspace, { parentId: this.statement.id, parent: this.statement.matrix, selected }]
            this.$emit("workspaceUpdate", newWorkspace)
        },
        onRowMouseOver(rowIndex) {
            this.$data.mouseoverRow = rowIndex
            //console.log(this.$data.mouseoverRow)
        },
        onRowMouseOut() {
            this.$data.mouseoverRow = -1
            //console.log(this.$data.mouseoverRow)
        },
        onColButtonClick(colIndex) { //Dunno why but in template in line with <th v-for="col in statement.matrix.columnsAmount" :key="col"> indexing by some reason starts with 1
            //console.log('Button clicked! ', colIndex);
            var selected = []
            for (var i = 0; i < this.statement.matrix.rowsAmount; i++) {
                selected.push({ row: i, col: colIndex })
            }
            const newWorkspace = [...this.$props.workspace, { parentId: this.statement.id, parent: this.statement.matrix, selected }]
            this.$emit("workspaceUpdate", newWorkspace)
        },
        onColMouseOver(colIndex) {
            this.$data.mouseoverCol = colIndex
            //console.log(this.$data.mouseoverCol)
        },
        onColMouseOut() {
            this.$data.mouseoverCol = -1
            //console.log(this.$data.mouseoverCol)
        },
        onAllButtonClick() {
            // console.log('All Button clicked! ');
            var selected = []
            for (var i = 0; i < this.statement.matrix.rowsAmount; i++) {
                for (var j = 0; j < this.statement.matrix.columnsAmount; j++) {
                    selected.push({ row: i, col: j })
                }
            }
            const newWorkspace = [...this.$props.workspace, { parentId: this.statement.id, parent: this.statement.matrix, selected }]
            this.$emit("workspaceUpdate", newWorkspace)
        },
        onAllMouseOver() {
            this.$data.mouseoverAll = true
            //console.log(this.$data.mouseoverCol)
        },
        onAllMouseOut() {
            this.$data.mouseoverAll = false
            //console.log(this.$data.mouseoverCol)
        },
        onSingleMouseClick(rowIndex, colIndex) {
            const newWorkspace = [...this.$props.workspace, { parentId: this.statement.id, parent: this.statement.matrix, selected: [{ row: rowIndex, col: colIndex }] }]
            this.$emit("workspaceUpdate", newWorkspace)
        },
        onSingleMouseOver(rowIndex, colIndex) {
            this.$data.mouseOverSingle = { row: rowIndex, col: colIndex }
            //console.log(this.$data.mouseOverSingle)
        },
        onSingleMouseOut() {
            this.$data.mouseOverSingle = { row: -1, col: -1 }
        },
        newStatementAdded(data) {
            this.$emit("newStatementAdded", data)
        }
    },
    computed: {
        cellStyle() {
            return (rowIndex, colIndex) => {
                if (this.mouseoverRow === rowIndex || this.mouseoverCol == colIndex || this.mouseoverAll || (this.mouseOverSingle.row === rowIndex && this.mouseOverSingle.col === colIndex)) {
                    return {
                        backgroundColor: "grey",
                        border: "1px solid grey"
                    };
                } else if (this.$props.workspace
                    .filter((w) => {
                        return w.parentId === this.statement.id
                    })
                    .filter((w) => {
                        return w.selected.filter((s) => {
                            //console.log(s.row, rowIndex, s.col, colIndex)
                            return s.row === rowIndex && s.col === colIndex
                        }).length !== 0
                    }).length !== 0) {
                    return {
                        backgroundColor: "white",
                        border: "1px solid black"
                    };
                } else {
                    return {
                        backgroundColor: "white",
                        border: "1px solid white"
                    };
                }
            };
        },
    },
    props: {
        statement: {
            required: true,
        },
        workspace: {
            type: Array,
            required: true
        }
    },
    emits: ['workspaceUpdate', 'newStatementAdded', 'statementDeleted']
};
</script>
  
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

.holder {
    background-color: #f0f0f0;
    margin: 1px;
    border-radius: 5px;
    color: #000000;
    align-content: flex-end;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.matrix {
    margin: 0% 1% 1% 1%;
    border: 0px solid #999999;
    font-family: 'Roboto Mono', monospace;
}

.stt {
    text-align: center;
    margin: 1%;
}

.cnt-cell {
    background-color: white;
    border: 1px solid black;
}

.cnt-cell-nohighlight {
    background-color: white;
}

.hld {
    margin: 3px 8px 3px 8px;
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

.bg-gray-300 {
    background-color: #d6d5d2;
}

.st-cmp-del-button {
    margin: 1%;
    text-align: center;
    font-size: medium;
    border: none;
    border-radius: 5px;
    padding: 4px;
}

.st-cmp-del-button:hover {
    background-color: #999999;
}
</style>
  