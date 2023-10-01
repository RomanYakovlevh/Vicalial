<template>
    <div class="text-center ma-2" v-if="isActive()">
        <v-snackbar v-model="this.$store.state.snackbar.isOpen" multi-line :timeout="6000">
            {{ title }}
            <template v-slot:actions>
                <v-btn v-if="moreInfo !== ''" @click="moreInfoVisible = true" size="small" variant="outlined"
                    class="align-self-center ma-3 ml-auto">Description
                    ⓘ</v-btn>
                <v-btn color="pink" variant="text" @click="closeSnackbar">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
    <v-dialog v-model="moreInfoVisible" width="auto">
        <v-card>
            <v-card-text>{{ moreInfo }}</v-card-text>
            <v-card-actions>
                <v-btn class="apply-button" @click=" moreInfoVisible = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default ({
    name: 'UniversalSnackbarComponent',
    components: {},
    props: {

    },
    data() {
        return {
            title: "",
            moreInfo: "",
            kind: "",
            moreInfoVisible: false
        }
    },
    methods: {

        closeSnackbar() {
            this.$store.commit('setCloseSnackBar')
        }
    },
    computed: {
        isActive() {
            return () => {
                const snackbarState = this.$store.state.snackbar
                if (snackbarState.isOpen) {
                    this.title = snackbarState.title
                    this.moreInfo = snackbarState.moreInfo
                    this.kind = snackbarState.kind
                    return true
                } else {
                    return false
                }
            }

        },

    }
})
</script>

<style scoped lang="scss"></style>