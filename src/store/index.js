import {createStore} from 'vuex'

export default createStore({
    state: {
        isOpenAddDataWindow: false,
        lastObjectID: 0,
        formatStyle: 0 // 0 - long float, 1 - fraction
    },
    getters: {},
    mutations: {
        setOpenDataWindow(state, value) {
            state.isOpenAddDataWindow = value;
        },
        incrementLastObjectId(state) {
            state.lastObjectID++
        }
    },
    actions: {},
    modules: {}
})
