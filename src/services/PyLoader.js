async function  pyLoad() {
    const pyodide = await window.loadPyodide({indexURL: "https://cdn.jsdelivr.net/pyodide/dev/full/"}); 
    // In some distant future we propably should replace fetching pyodide from jsdelivr to fetching it from our own server. There is also script import in index.html.
    await pyodide.loadPackage("numpy");
    pyodide.runPython("import numpy");
    return pyodide
}

export let pyodide;

pyLoad().then(x => pyodide = x)