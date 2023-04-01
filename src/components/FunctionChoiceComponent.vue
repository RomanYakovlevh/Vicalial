<template>
    <div class="tabs">
        <div class="tab-buttons">
            <button v-for="(tab, index) in tabs" :key="index" @click="activeTabIndex = index"
                :class="{ active: index === activeTabIndex }">{{ tab.title }}</button>
        </div>
        <div class="tab-contents">
            <div v-for="(tab, index) in tabs" :key="index" v-show="isTabActive(index)"
                :class="{ active: index === activeTabIndex }">
                <button v-for="(op, j) in tab.content" :key="j">
                    {{ op.name }}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "FunctionChoiceComponent",
    props: {
    },
    data() {
        return {
            activeTabIndex: 0,
            tabs: [
                {
                    title: "Math",
                    content: [
                        { id: 0, shorthand: "+", name: "Addition" },
                        { id: 1, shorthand: "-", name: "Substraction" },
                        { id: 2, shorthand: "*", name: "Multiplication" },
                        { id: 3, shorthand: "T", name: "Transposition" },
                        { id: 4, shorthand: "^-1", name: "Inversion" }],
                },
                {
                    title: "Code",
                    content: [
                        { id: 5, shorthand: "+", name: "Replace" },
                        { id: 6, shorthand: "-", name: "Swap" },
                        { id: 7, shorthand: "*", name: "Map" },
                        { id: 8, shorthand: "T", name: "Fold" },
                        { id: 9, shorthand: "^-1", name: "Size" }],
                },
                {
                    title: "Other",
                    content: [
                        { id: 10, shorthand: "+", name: "Plot" },
                        { id: 11, shorthand: "-", name: "Export LaTex" },
                        { id: 12, shorthand: "*", name: "Export Excel" },
                        { id: 13, shorthand: "T", name: "Export .txt" },
                        { id: 14, shorthand: "^-1", name: "To Abstract" }],
                },
            ],
        };
    },
    computed: {
        isTabActive() {
            return (index) => {
                console.log(this.$props.tabs)
                return index === this.activeTabIndex;
            };
        },
    },
};
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
</style>
  