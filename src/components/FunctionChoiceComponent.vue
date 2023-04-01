<template>
    <div class="tabs">
        <div class="tab-buttons">
            <button v-for="(tab, index) in tabs" :key="index" @click="activeTabIndex = index"
                :class="{ active: index === activeTabIndex }">{{ tab.title }}</button>
        </div>
        <div class="tab-contents">
            <div v-for="(tab, index) in tabs" :key="index" v-show="isTabActive(index)" :class="{ active: index === activeTabIndex }">
                <div>
                    content: {{ tab.content }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "FunctionChoiceComponent",
    props: {
        tabs: {
            type: Array,
            required: true,
            validator: (value) => {
                return value.every((tab) => "title" in tab && "content" in tab);
            },
        },
    },
    data() {
        return {
            activeTabIndex: 0,
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
  