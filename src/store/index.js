import {createStore} from 'vuex'

export default createStore({
    state: {
        isOpenAddDataWindow: false,
        lastObjectID: 0,
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
