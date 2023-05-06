<template>
    <v-sheet variant="tonal" class="d-flex flex-row ma-1 sc2-sheet">
        <v-btn icon="✖" variant="tonal" class="align-self-center ma-3">
            ✖
        </v-btn>
        <div :style="nameModelStyle()" class="align-self-center my-auto">
            <v-text-field class="align-self-center my-auto" variant='plain' v-model="matrixNameModel" counter="20" />
        </div>
        <div class="align-self-center my-auto mx-3">
            = {{ matrix.getRelative() }}
        </div>
        <matrix-viewer :matrix="matrix" :workspace="workspace" :workspace-version="workspaceVersion"
            @workspace-push="onWorkspacePush" />
        <matrix-methods-tabs @method-chosen="onMethodChosen" />
        <method-arguments v-if="chosenMethod !== undefined" :matrix-method="chosenMethod" :workspace="workspace"
            @clear-workspace="onClearWorkspace" @statement-added="onStatementAdded" />
    </v-sheet>
</template>

<script>
import { NamedMatrix } from '@/services/NamedMatrix';
import { Workspace } from '@/services/Workspace';
import MatrixViewer from './MatrixViewer.vue';
import MatrixMethodsTabs from './MatrixMethodsTabs.vue';
import MethodArguments from './MethodArguments.vue';
import { findFunctionByName } from '@/services/MatrixMethods';


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
        chosenMethod: undefined
    }),
    components: {
        MatrixViewer,
        MatrixMethodsTabs,
        MethodArguments
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
        onMethodChosen(name) {
            this.chosenMethod = findFunctionByName(name)
        },
        onClearWorkspace() {
            this.$emit('clearWorkspace')
        },
        onStatementAdded(st) {
            this.$emit('statementAdded', st)
        }
    },
    computed: {
        nameModelStyle() {
            return () => {
                return {
                    width: this.$data.matrixNameModel.length + "rem",
                }
            }
        }
    },
    mounted() {
        this.$data.matrixNameModel = this.$props.matrix.name
    },
    emits: ["workspacePush", 'clearWorkspace', 'statementAdded']
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