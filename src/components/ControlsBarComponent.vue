<template>
    <div class="bottom-bar">
        <button class="btn" @click=setOpenDataWindow(true)>add data</button>
        <button class="btn" @click="clearWorkspace">deselect</button>
    </div>
</template>

<script>
export default {
    name: 'ControlsBarComponent',
    methods: {
        setOpenDataWindow(value) {
            this.$store.commit('setOpenDataWindow', value)
        },
        clearWorkspace() {
            this.$emit('workspaceUpdate', [])
        }
    },
    emits: ['workspaceUpdate']
}
</script>


<style scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 98%;
    background-color: #ffe8a3;
    display: flex;
    padding: 10px;
    margin: 1%;
    box-sizing: border-box;
    border-radius: 30px;

}

.btn {
    background-color: #ffcd29;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 18px;
    cursor: pointer;
    margin-right: 0.5%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.btn:hover {
    background-color: #e0ac00;
}

.btm-bar-divider {
    width: 0.5%;
    background-color: #333333;
    margin-right: 0.5%;
    border-radius: 5px;
}
</style>
