<template>
    <v-card-subtitle>Upload or drop files in following formats</v-card-subtitle>
    <v-file-input 
        label=".xlx .xlsx .txt .csv .json .tex"
        accept=".csv, .txt, .json, .sql, .tex, .latex, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
        prepend-icon=""
        variant="underlined"
        v-model="files"></v-file-input>
</template>

<script lang="ts">

export default {
    name: 'AddFromFile',
    data () {
        return {
            files: []
        }
    },
    emits: ['closeDialog', 'newStatementAdded']
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
</style>