<template>
    <div v-if="!hasPyodideLoaded" style="font-size: 3em">Loading...</div>
    <div v-if="hasPyodideLoaded">
        <div v-if="statements.length === 0" class="ma-auto">
            Welcome to visual calculator for linear algebra and operational analysis!
            ***TODO: list thing that one can do here***
            As a first step, you might want to...
            <v-btn class="btn" @click="dialog = true">Add data</v-btn>
            <v-dialog v-model="dialog" width="auto">
                <AddDataWindow @close-dialog="dialog = false" @new-statement-added="pushStatement"></AddDataWindow>
            </v-dialog>
        </div>
        <div class="statement-components-list">
            <div v-for="s in getStatements" :key=s.id>
                <StatementComponent2 :matrix="s" :workspace="workspace" :workspace-version="workspaceVersion"
                    @workspace-push="onPushWorkspace" @clear-workspace="onClearWorkspace" @statement-added="pushStatement"
                    @delete-statement="onDeleteStatement" @statement-updated="onStatementUpdated" />
            </div>
        </div>
        <ControlsBarComponent class="cntls-bar-cmp" @workspace-update="onClearWorkspace"
            @new-statement-added="pushStatement" />
    </div>
    <UniversalSnackBarComponentVue></UniversalSnackBarComponentVue>
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
import UniversalSnackBarComponentVue from "@/components/UniversalSnackBarComponent.vue";

export default {
    name: 'CalculatorView',
    components: {
        //StatementComponent,
        ControlsBarComponent,
        StatementComponent2,
        UniversalSnackBarComponentVue
    },
    data() {
        return {
            statements: [],
            workspace: new Workspace(),
            workspaceVersion: 0,
            dialog: false
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
        onDeleteStatement(stId) {
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
