<template>
    <p class="greeting">{{ statement }}</p>
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
    }

}
</script>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>
