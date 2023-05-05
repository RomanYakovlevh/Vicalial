<template>
    <v-card variant="tonal" class="d-flex flex-row ma-1">
        <v-btn icon="✖" variant="tonal" class="align-self-center ma-3">
            ✖
        </v-btn>
        <div :style="nameModelStyle()" class="align-self-center my-auto" >
            <v-text-field class="align-self-center my-auto" variant='plain' v-model="matrixNameModel" />
        </div>
        <div class="align-self-center my-auto mx-3">
            = {{ matrix.getRelative() }}
        </div>
        <matrix-viewer :matrix="matrix" :workspace="workspace" :workspace-version="workspaceVersion" @workspace-push="onWorkspacePush"/>
        <matrix-methods-tabs @method-chosen=""/>
    </v-card>
</template>

<script>
import { NamedMatrix } from '@/services/NamedMatrix';
import { Workspace } from '@/services/Workspace';
import MatrixViewer from './MatrixViewer.vue';
import MatrixMethodsTabs from './MatrixMethodsTabs.vue';

//style="border: 1px solid black;"
export default {
    data: () => ({
        matrixNameModel: 'unknown',
    }),
    components: {
        MatrixViewer,
        MatrixMethodsTabs
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
        }
    },
    computed: {
        nameModelStyle() {
            return () => {
                return {
                    width: this.$data.matrixNameModel.length + "em",
                }
            }
        }
    },
    mounted() {
        this.$data.matrixNameModel = this.$props.matrix.name
    },
    emits: ["workspacePush"]
}
</script>

<style scoped lang="scss"></style>