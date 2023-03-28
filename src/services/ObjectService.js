import {useStore} from 'vuex'

const store = useStore()

function getId() {
    const id = store.state.lastObjectID;
    store.commit('incrementLastObjectId');
    return id;
}

function createMatrixObject(str) {
    const v = str.split('\n').map((x) => x.split(','));
    const id = getId();
    const name = "object" + id;
    return {
        id: id,
        name: name,
        value: v
    };
}

function appendMatrixObject(str) {
    const obj = createMatrixObject(str)
    store.commit('appendStatement', obj)
}

export default {
    name: 'AddDataWindow',
    appendMatrixObject
}