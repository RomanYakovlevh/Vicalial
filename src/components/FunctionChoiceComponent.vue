<template>
    <div class="tabs">
        <div class="tab-buttons">
            <button v-for="(tab, index) in tabs" :key="index" @click="activeTabIndex = index"
                :class="{ active: index === activeTabIndex }">{{ tab.title }}</button>
        </div>
        <div class="tab-contents">
            <div v-for="(tab, index) in tabs" :key="index" v-show="isTabActive(index)"
                :class="{ active: index === activeTabIndex }">
                <button v-for="(op, j) in tab.content" :key="j" @click="activeFunctionChoiceIndex = op.id">
                    {{ op.name }}
                </button>
            </div>
        </div>
    </div>
    <div v-if="activeFunctionChoiceIndex !== -1" class="fun-arg-sel">
        {{ allFunctions.find(x => x.id === activeFunctionChoiceIndex).name }}:
        <div v-for="i in Array.from({ length: allFunctions.find(x => x.id === activeFunctionChoiceIndex).argNum }, (_, index) => index)"
            :key="i">
            {{ this.pullFromWorkspace(i) }},
        </div>
        <button v-if="allFunctions.find(x => x.id === activeFunctionChoiceIndex).argNum <= workspace.length"
            @click="runFunction()">Apply</button>
    </div>
</template>
  
<script>
import { runFunctionById } from '@/services/Matrix'

export default {
    name: "FunctionChoiceComponent",
    props: {
        workspace: { require: true, type: Array }
    },
    methods: {
        pullFromWorkspace(i) {
            if (i < this.$props.workspace.length) {
                return "s" + i
            } else {
                return "-"
            }
        },
        runFunction() {
            const objid = this.$store.state.lastObjectID
            const name = "object" + objid
            const matrix = runFunctionById(this.$data.activeFunctionChoiceIndex, this.$props.workspace)

            this.$store.commit('incrementLastObjectId')
            this.$emit("newDataAdded", { objid, name, matrix })
        },
    },
    data() {
        return {
            activeTabIndex: 0,
            activeFunctionChoiceIndex: -1,
            allFunctions: [{ id: 0, shorthand: "+", name: "Addition", argNum: 2 },
            { id: 1, shorthand: "-", name: "Substraction", argNum: 2 },
            { id: 2, shorthand: "*", name: "Multiplication", argNum: 2 },
            { id: 3, shorthand: "T", name: "Transposition", argNum: 1 },
            { id: 4, shorthand: "^-1", name: "Inversion", argNum: 1 },
            { id: 5, shorthand: "+", name: "Replace", argNum: 2 },
            { id: 6, shorthand: "-", name: "Swap", argNum: 2 },
            { id: 7, shorthand: "*", name: "Map", argNum: 2 },
            { id: 8, shorthand: "T", name: "Fold", argNum: 2 },
            { id: 9, shorthand: "^-1", name: "Size", argNum: 1 },
            { id: 10, shorthand: "+", name: "Plot", argNum: 1 },
            { id: 11, shorthand: "-", name: "Export LaTex", argNum: 1 },
            { id: 12, shorthand: "*", name: "Export Excel", argNum: 1 },
            { id: 13, shorthand: "T", name: "Export .txt", argNum: 1 },
            { id: 14, shorthand: "^-1", name: "To Abstract", argNum: 1 }]
        };
    },
    computed: {
        isTabActive() {
            return (index) => {
                console.log(this.$props.tabs)
                return index === this.activeTabIndex;
            };
        },
        tabs() {
            return [
                {
                    title: "Math",
                    content: this.allFunctions.filter((x) => new Array(0, 1, 2, 3, 4).findIndex(y => y === x.id) !== -1),
                },
                {
                    title: "Code",
                    content: this.allFunctions.filter((x) => new Array(5, 6, 7, 8, 9).findIndex(y => y === x.id) !== -1),
                },
                {
                    title: "Other",
                    content: this.allFunctions.filter((x) => new Array(10, 11, 12, 13, 14).findIndex(y => y === x.id) !== -1),
                },
            ]
        }
    },
    emits: ['newDataAdded']
}
</script>
  
<style>
.tabs {
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100%;
    padding: 5px;
    border-radius: 10px;
    font-size: small;
}

.tab-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}

.tab-buttons button {
    border: none;
    background-color: transparent;
    padding: 8px 12px;
    margin-right: 10px;
    cursor: pointer;
}

.tab-buttons button.active {
    background-color: gray;
    border-radius: 10px;
}

.tab-contents {
    width: 100%;
}

.tab-contents>div:not(.active) {
    display: none;
}

.tab-contents>div:first-child {
    display: block;
}

.fun-arg-sel {
    display: flex;
    flex-direction: row;
    margin: 1%;
}
</style>
  