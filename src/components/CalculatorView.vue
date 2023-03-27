<script>
import StatementComponent from "@/components/StatementComponent.vue";

export default {
    name: 'CalculatorView',
    components: {
        StatementComponent
    },
    data() {
        return {
            statements: [1, 2, 3]
        }
    }
}
</script>

<template>
    <p class="greeting" v-for="s in statements" :key=s>{{ s }}
        <StatementComponent></StatementComponent>
    </p>
</template>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>
