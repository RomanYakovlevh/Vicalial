import {createStore} from 'vuex'

export default createStore({
    state: {
        isOpenAddDataWindow: false,
        lastObjectID: 0,
        statementNames: new Map(),
        statementValues: new Map()
    },
    getters: {},
    mutations: {
        setOpenDataWindow(state, value) {
            state.isOpenAddDataWindow = value;
        },
        appendStatement(state, {id, name, value}) {
            console.log(id, name, value)
            state.statementNames.set(id, name);
            state.statementValues.set(id, value);
        },
        incrementLastObjectId(state) {
            state.lastObjectID++
        }
    },
    actions: {},
    modules: {}
})
