<template>
    <AddDataWindow @new-statement-added="pushStatement" />
    <button @click="updateWorkspace([])">Deselect</button>
    <div class="greeting" v-for="s in getStatements" :key=s.id>
        <StatementComponent :statement=s :workspace=workspace @workspace-update="updateWorkspace"
            @new-statement-added="pushStatement" @statement-deleted="deleteStatement">
        </StatementComponent>
    </div>
    <ControlsBarComponent />
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
            //console.log(this.$data.workspace)
        },
        deleteStatement(stId) {
            this.$data.statements = this.$data.statements.filter(x => x.id !== stId)
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
