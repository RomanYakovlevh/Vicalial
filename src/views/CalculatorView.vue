<template>
    <div v-if="!hasPyodideLoaded" style="font-size: 3em">Loading...</div>
    <div v-if="hasPyodideLoaded">
        <div class="statement-components-list">
            <div v-for="s in getStatements" :key=s.id>
                <StatementComponent2 :matrix="s" :workspace="workspace" :workspace-version="workspaceVersion" @workspace-push="onPushWorkspace" />
            </div>
        </div>
        <ControlsBarComponent class="cntls-bar-cmp" @workspace-update="onClearWorkspace"
            @new-statement-added="pushStatement" />
    </div>
</template>

<script>
/*
                <StatementComponent :statement=s :workspace=workspace @workspace-update="updateWorkspace"
                    @new-statement-added="pushStatement" @statement-deleted="deleteStatement"
                    @statement-updated="onStatementUpdated">
                </StatementComponent>

*/


import ControlsBarComponent from "@/components/ControlsBarComponent.vue";
//import StatementComponent from "@/components/StatementComponent.vue";
import { reactiveState } from "@/services/PyLoader";
import StatementComponent2 from "@/components/StatementComponent2.vue";
import { Workspace } from "@/services/Workspace";

export default {
    name: 'CalculatorView',
    components: {
        //StatementComponent,
        ControlsBarComponent,
        StatementComponent2
    },
    data() {
        return {
            statements: [],
            workspace: new Workspace(),
            workspaceVersion: 0
        }
    },
    computed: {
        getStatements() {
            return this.$data.statements
        },
        getWorkspace() {
            return this.$data.workspace
        },
        hasPyodideLoaded() {
            return reactiveState.hasLoaded
        }
    },
    methods: {
        pushStatement(st) {
            this.$data.statements.push(st)
        },
        onPushWorkspace(n) {
            this.workspace.list.push(n)
            this.workspaceVersion++
            console.log(this.workspace.list.length)
        },
        onClearWorkspace() {
            this.workspace.list = []
            this.workspaceVersion++
        },
        deleteStatement(stId) {
            this.$data.statements = this.$data.statements.filter(x => x.id !== stId)
        },
        onStatementUpdated(statement) {
            this.$data.statements[this.$data.statements.findIndex(x => x.id === statement.id)] = statement
        }
    }
}
</script>

<style>
.statement-components-list {
    padding-bottom: 10%;
}
</style>
