<template>
    <AddDataWindow @new-data-added="pushStatement"/>
    <button @click="updateWorkspace([])">Deselect</button>
    <div class="greeting" v-for="s in getStatements" :key=s.id>
        <StatementComponent :statement=s :workspace=workspace @workspace-update="updateWorkspace">
        </StatementComponent>
    </div>
    <ControlsBarComponent/>
</template>

<script>
import ControlsBarComponent from "@/components/ControlsBarComponent.vue";
import AddDataWindow from "@/components/AddDataWindow.vue";
import StatementComponent from "@/components/StatementComponent.vue";

export default {
    name: 'CalculatorView',
    components: {
        StatementComponent,
        ControlsBarComponent,
        AddDataWindow
    },
    data() {
        return {
            statements: [],
            workspace: new Array()
        }
    },
    computed: {
        getStatements() {
            return this.$data.statements
        },
        getWorkspace() {
            return this.$data.workspace
        }
    },
    methods: {
        pushStatement(st) {
            this.$data.statements.push(st)
        },
        updateWorkspace(workspaceModified) {
            this.$data.workspace = workspaceModified
            console.log(this.$data.workspace)
        }
    }
}
</script>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>
