<template>
    <v-sheet variant="tonal" class="d-flex flex-row ma-1 sc2-sheet">
        <v-btn icon="✖" variant="tonal" class="align-self-center ma-3" @click="onDeleteStatement(matrix.id)">
            ✖
        </v-btn>
        <div :style="nameModelStyle()" class="align-self-center my-auto">
            <v-text-field class="align-self-center my-auto" variant='plain' v-model="matrixNameModel"
                @update:model-value="onStatementNameUpdate" counter="20" />
        </div>
        <div class="align-self-center my-auto mx-3">
            = {{ matrix.getRelative() }}
        </div>
        <div>
            <matrix-viewer :matrix="matrix" :workspace="workspace" :workspace-version="workspaceVersion"
                @workspace-push="onWorkspacePush" class="ma-3" />
                <v-btn v-show="workspace.list.filter(x => x.parent.id === matrix.id).length !== 0" variant="tonal" class="mb-3" size='small' @click="onDeleteFromWorkspacebyStId()">
                    Deselect
                </v-btn>
        </div>

        <matrix-methods-tabs v-if="workspace.list.length !== 0 && workspace.list[0].parent.id === matrix.id"
            :workspace="workspace" @clear-workspace="onClearWorkspace" @statement-added="onStatementAdded" @statement-update="onStatementUpdate"/>
    </v-sheet>
</template>

<script>
import { NamedMatrix } from '@/services/NamedMatrix';
import { Workspace } from '@/services/Workspace';
import MatrixViewer from './MatrixViewer.vue';
import MatrixMethodsTabs from './MatrixMethodsTabs.vue';


/*
        <v-sheet v-if="chosenMethod !== undefined" class="ma-sheet ma-2">
            <v-btn icon="◁" variant="tonal" class="align-self-center ma-3" @click="chosenMethod=undefined">
                ◁
            </v-btn>
        </v-sheet>

*/

//style="border: 1px solid black;"
export default {
    data: () => ({
        matrixNameModel: 'unknown',
    }),
    components: {
        MatrixViewer,
        MatrixMethodsTabs,
    },
    props: {
        matrix: {
            type: NamedMatrix,
            required: true,
        },
        workspace: {
            type: Workspace,
            required: true
        },
        workspaceVersion: {
            required: true
        }
    },
    methods: {
        onWorkspacePush(we) {
            this.$emit("workspacePush", we)
        },
        onClearWorkspace() {
            this.$emit('clearWorkspace')
        },
        onDeleteFromWorkspacebyStId() {
            this.$emit('deleteFromWorkspace', this.$props.matrix.id)
        },
        onStatementAdded(st) {
            this.$emit('statementAdded', st)
        },
        onDeleteStatement(id) {
            this.$emit('deleteStatement', id)
        },
        onStatementNameUpdate() {
            const name = this.$data.matrixNameModel
            this.$props.matrix.changeNameUnsafe(name)
            this.$emit('statementUpdated', this.$props.matrix)
        },
        onStatementUpdate() {
            this.$emit('statementUpdated', this.$props.matrix)
        }
    },
    computed: {
        nameModelStyle() {
            return () => {
                return {
                    width: (this.$data.matrixNameModel.length * 0.7) + "rem",
                }
            }
        }
    },
    mounted() {
        this.$data.matrixNameModel = this.$props.matrix.name
    },
    emits: ["workspacePush", 'clearWorkspace', 'statementAdded', 'deleteStatement', 'statementUpdated', 'deleteFromWorkspace']
}
</script>

<style scoped lang="scss">
.sc2-sheet {
    background-color: #f0f0f0;
    border-radius: 5px;
}

.ma-sheet {
    border-radius: 5px;
    background-color: #ddd;
}
</style>