<template>
    <AddDataWindow/>
    <p class="greeting" v-for="s in getStatements" :key=s.id>{{ s.id }}
    </p>
    <ControlsBarComponent/>
</template>

<script>
import ControlsBarComponent from "@/components/ControlsBarComponent.vue";
import AddDataWindow from "@/components/AddDataWindow.vue";

export default {
    name: 'CalculatorView',
    components: {
        ControlsBarComponent,
        AddDataWindow
    },
    data() {
        return {
            statements: [1, 2, 3]
        }
    },
    computed: {
        getStatements() {
            let statements = [];
            this.$store.state.statementNames.forEach((id, n) => {
                statements.push({
                    id: id,
                    name: n,
                    value: this.$store.state.statementValues[id]
                })
            })
            return statements
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
