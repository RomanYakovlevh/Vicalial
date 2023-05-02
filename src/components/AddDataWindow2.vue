<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="Any expression">Any expression</v-tab>
            <v-tab value="Manual input">Manual input</v-tab>
            <v-tab value="From file">From file</v-tab>
            <v-tab value="Generator">Generator</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="Any expression">
                    <AddAnyExpression @close-dialog="closeDialog" @new-statement-added="newStatementAdded"/>
                </v-window-item>

                <v-window-item value="Manual input">
                    Manual input
                </v-window-item>

                <v-window-item value="From file">
                    <AddFromFile @close-dialog="closeDialog" @new-statement-added="newStatementAdded"/>
                </v-window-item>

                <v-window-item value="Generator">
                    Generator
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script>
import AddAnyExpression from './AddAnyExpression.vue'
import AddFromFile from './AddFromFile.vue';

export default {
    name: "AddDataWindow2",
    components: {
        AddAnyExpression,
        AddFromFile
    },
    data: () => ({
        tab: null,
    }),
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        },
        newStatementAdded(statement) {
            this.$emit('newStatementAdded', statement)
        }
    },
    emits: ['closeDialog', 'newStatementAdded']
}

</script>

<style scoped lang="scss"></style>