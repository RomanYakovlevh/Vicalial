<template>
    <p class="greeting">{{ greeting }}</p>
</template>

<script>
export default {
    name: 'StatementComponent',
    data() {
        return {
            greeting: 'Hello World!'
        }
    }
}
</script>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>
