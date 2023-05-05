<template>
    <v-sheet class="mmb-sheet">
        <div class="subtext">choose function</div>
        <v-btn size="small" variant="tonal" v-for="(m, i) in methods.top" :key="i" class="ma-1" @click="buttonClick(m.name())">{{ m.name() }}</v-btn>
        <v-combobox label="More functions" density="compact" v-model="value" :items="methods.all().map(x => x.name())"
                class="ma-1" variant="outlined" @update:model-value="comboxChange" :color="comboxColor()"></v-combobox>
    </v-sheet>
</template>

<script>

export default {
    name: "MatrixMethodsButtons",
    data() {
        return {
            value: null,
            incorrectComboxValue: false
        };
    },
    props: {
        methods: {
            require: true
        }
    },
    methods: {
        comboxChange() {
            if (this.value === '') {
                this.value = null
            }
            if (this.value !== null && this.methods.all().map(x => x.name()).filter(x => x === this.value.trim()).length === 0) {
                this.$data.incorrectComboxValue = true
            } else {
                this.$data.incorrectComboxValue = false
                if (this.value !== null) {
                    this.$emit('methodChosen', this.value)
                }
            }

        },
        buttonClick(name) {
            this.value = null
            this.$emit('methodChosen', name)
        }
    },
    computed: {
        comboxColor() {
            return () => {
                if (this.$data.incorrectComboxValue) {
                    return "red"
                } else {
                    return ""
                }
            }
        }
    },
    emit: ['methodChosen']
}
</script>

<style scoped lang="scss">
.mmb-sheet {
background-color: #ddd;
}

.subtext {
    color: #999;
    align-content:start;
}
</style>