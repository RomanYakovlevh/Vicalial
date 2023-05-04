import { reactive } from 'vue';

async function pyLoad() {
    const pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/dev/full/" })
    // In some distant future we propably should replace fetching pyodide from jsdelivr to fetching it from our own server. There is also script import in index.html.
    await pyodide.loadPackage("numpy")
    await pyodide.loadPackage("sympy")
    pyodide.runPython(
        "import numpy \n" +
        "import sympy \n"
    )
    return pyodide
}

export let pyodide

export const reactiveState = reactive({
    hasLoaded: false
})

pyLoad().then(x => {
    pyodide = x
    reactiveState.hasLoaded = true
})