<template>
    <v-sheet variant="tonal" class="ma-2 mmt-sheet pa-2">
        <v-tabs v-model="tab" density="compact" size="small">
            <v-tab value="Math"><v-icon>mdi-calculator-variant</v-icon>Math</v-tab>
            <v-tab value="Code"><v-icon>mdi-application-braces</v-icon>Code</v-tab>
            <v-tab value="Other"><v-icon>mdi-tools</v-icon>Other</v-tab>
        </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="Math">
                    <MatrixMethodsButtons :methods="mathMethodGroupConstruct()" @method-chosen="onMethodChosen"/>
                </v-window-item>

                <v-window-item value="Code">
                    <MatrixMethodsButtons :methods="codeMethodGroupConstruct()"  @method-chosen="onMethodChosen"/>
                </v-window-item>

                <v-window-item value="Other">
                    <MatrixMethodsButtons :methods="otherMethodGroupConstruct()"  @method-chosen="onMethodChosen"/>
                </v-window-item>
            </v-window>
    </v-sheet>
    <method-arguments v-if="chosenMethod !== undefined" :matrix-method="chosenMethod" :workspace="workspace"
            @clear-workspace="onClearWorkspace" @statement-added="onStatementAdded" @statementUpdate="onStatementUpdate"/>
</template>

<script>
import MatrixMethodsButtons from './MatrixMethodsButtons.vue';
import { allMethodGroups } from '@/services/MethodGroups';
import MethodArguments from './method_argument_types/MethodArguments.vue';
import { Workspace } from '@/services/Workspace';
import { findFunctionByName } from '@/services/MethodGroups';

export default {
    data: () => ({
        tab: null,
        chosenMethod: undefined
    }),
    props: {
        workspace: {
            type: Workspace,
            required: true
        }
    },
    components: {
        MatrixMethodsButtons,
        MethodArguments
    },
    methods: {
        mathMethodGroupConstruct() {
            return allMethodGroups.math
        },
        codeMethodGroupConstruct() {
            return allMethodGroups.code
        },
        otherMethodGroupConstruct() {
            return allMethodGroups.other
        },
        onMethodChosen(name) {
            this.chosenMethod = findFunctionByName(name)
        },
        onClearWorkspace() {
            this.$emit('clearWorkspace')
        },
        onStatementAdded(st) {
            this.$emit('statementAdded', st)
        },
        onStatementUpdate() {
            this.$emit("statementUpdate")
        }
    },
    emits: ['clearWorkspace', 'statementAdded', "statementUpdate"]
}

</script>

<style scoped lang="scss">
.mmt-sheet {
    border-radius: 5px;
    background-color: #ddd;
}
</style>