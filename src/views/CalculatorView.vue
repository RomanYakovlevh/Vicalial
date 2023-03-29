<template>
    <AddDataWindow @new-data-added="pushStatement"/>
    <div class="greeting" v-for="s in getStatements" :key=s.id>
        <StatementComponent :statement=s>
        </StatementComponent>
    </div>
    <ControlsBarComponent/>
</template>

<script>
import ControlsBarComponent from "@/components/ControlsBarComponent.vue";
import AddDataWindow from "@/components/AddDataWindow.vue";
import StatementComponent from "@/components/StatementComponent.vue";

export default {
    name: 'CalculatorView',
    components: {
        StatementComponent,
        ControlsBarComponent,
        AddDataWindow
    },
    data() {
        return {
            statements: []
        }
    },
    computed: {
        getStatements() {
            return this.$data.statements
        }
    },
    methods: {
        pushStatement(st) {
            this.$data.statements.push(st)
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
