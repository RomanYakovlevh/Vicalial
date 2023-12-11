<template>
    <div class="bottom-bar">
        <button class="btn" @click="dialog = true">Add data</button>
        <button class="btn" @click="clearWorkspace">Deselect</button>
        <div class="frmt-as-cbc-text"> Format as: </div>
        <button class="btn" @click="this.$store.state.formatStyle = 0">Long Float</button>
        <button class="btn" @click="this.$store.state.formatStyle = 1">Fraction</button>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <AddDataWindow @close-dialog="dialog = false" @new-statement-added="onNewStatementAdded"></AddDataWindow>
    </v-dialog>
</template>

<script>

import AddDataWindow from '@/components/add_data_components/AddDataWindow.vue'

export default {
    name: 'ControlsBarComponent',
    data () {
      return {
        dialog: false,
      }
    },
    components: {
      AddDataWindow
    },
    methods: {
        setOpenDataWindow(value) {
            this.$store.commit('setOpenDataWindow', value)
        },
        clearWorkspace() {
            this.$emit('workspaceUpdate')
        },
        onNewStatementAdded(statement) {
          this.$emit('newStatementAdded', statement)
        }
    },
    emits: ['workspaceUpdate', 'newStatementAdded']
}
</script>


<style scoped lang="scss">
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

      &:hover {
        background-color: #e0ac00;
      }
    }

    .frmt-as-cbc-text {
      font-size: 18px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      margin: 0.5%;
      color: black;
    }
  }
</style>
