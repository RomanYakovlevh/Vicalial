import { createStore } from 'vuex'

export default createStore({
    state: {
        isOpenAddDataWindow: false,
        lastObjectID: 0,
        formatStyle: 1, // 0 - long float, 1 - fraction
        snackbar: { isOpen: false, title: "", moreInfo: "", kind: "" }
    },
    getters: {},
    mutations: {
        setOpenDataWindow(state, value) {
            state.isOpenAddDataWindow = value;
        },
        incrementLastObjectId(state) {
            state.lastObjectID++
        },
        setOpenSnackBar(state, {title, moreInfo, kind}) {
            state.snackbar = { isOpen: true, title: title, moreInfo: moreInfo, kind: kind }
        },
        setCloseSnackBar(state) {
            state.snackbar.isOpen = false
        }
    },
    actions: {},
    modules: {}
})
