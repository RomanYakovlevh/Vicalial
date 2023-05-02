<template>
    <div v-if="!hasPyodideLoaded" style="font-size: 3em">Loading...</div>
    <div v-if="hasPyodideLoaded">
        <div class="statement-components-list">
            <div class="greeting" v-for="s in getStatements" :key=s.id>
                <StatementComponent :statement=s :workspace=workspace @workspace-update="updateWorkspace"
                    @new-statement-added="pushStatement" @statement-deleted="deleteStatement"
                    @statement-updated="onStatementUpdated">
                </StatementComponent>
            </div>
        </div>
        <ControlsBarComponent class="cntls-bar-cmp" @workspace-update="updateWorkspace" @new-statement-added="pushStatement"/>
    </div>
</template>

<script>
import ControlsBarComponent from "@/components/ControlsBarComponent.vue";
import StatementComponent from "@/components/StatementComponent.vue";
import { reactiveState } from "@/services/PyLoader";

export default {
    name: 'CalculatorView',
    components: {
        StatementComponent,
        ControlsBarComponent
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
        },
        hasPyodideLoaded() {
            return reactiveState.hasLoaded
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
        },
        onStatementUpdated(statement) {
            this.$data.statements[this.$data.statements.findIndex(x => x.id === statement.id)] = statement
        }
    }
}
</script>

<style>
.greeting {
    color: red;
    font-weight: bold;
}

.statement-components-list {
    padding-bottom: 10%;
}
</style>
