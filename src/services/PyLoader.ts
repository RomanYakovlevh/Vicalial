import { loadPyodide } from "pyodide";

async function  pyLoad() {
    const pyodide = await loadPyodide();
    await pyodide.loadPackage("numpy");
    return pyodide
}

export const pyodide = await pyLoad()