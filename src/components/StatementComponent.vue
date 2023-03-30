<template>
    <div class="greeting">{{ statement }}</div>
    <table class=".matrix"></table>
</template>

<script>
export default {
    name: 'StatementComponent',
    data() {
        return {
        }
    },
    props: {
        statement: {
            required: true
        }
    },
    mounted() {
        const table = document.querySelector('.matrix')
        this.statement.forEach(function(line) {
            table.insertRow()
            line.forEach(function (item) {
                table.insrtCell().textContext = item
            })
        })
    }

}
</script>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>
