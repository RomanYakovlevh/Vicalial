<template>
    <v-sheet variant="tonal">
        <v-tabs v-model="tab">
            <v-tab value="Math">Math</v-tab>
            <v-tab value="Code">Code</v-tab>
            <v-tab value="Other">Other</v-tab>
        </v-tabs>

        <v-card-text>
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
        </v-card-text>
    </v-sheet>
</template>

<script>
import MatrixMethodsButtons from './MatrixMethodsButtons.vue';
import { MathMethodGroup, CodeMethodGroup, OtherMethodGroup } from '@/services/MatrixMethods';

export default {
    data: () => ({
        tab: null,
    }),
    components: {
        MatrixMethodsButtons
    },
    methods: {
        mathMethodGroupConstruct() {
            return new MathMethodGroup()
        },
        codeMethodGroupConstruct() {
            return new CodeMethodGroup()
        },
        otherMethodGroupConstruct() {
            return new OtherMethodGroup()
        },
        onMethodChosen(name) {
            this.$emit('methodChosen', name)
        }
    },
    emit: ['methodChosen']
}

</script>

<style scoped lang="scss"></style>