import { reactive } from 'vue';


const p = `
import numpy
import sympy
from math import *
import math
from scipy.optimize import linprog


def ensureMatrix(M):
    if type(M) == numpy.matrix:
        return M.tolist()
    else:
        return [[M]]


def sin(degrees):
    radians = math.radians(degrees)
    return math.sin(radians)

def cos(degrees):
    radians = math.radians(degrees)
    return math.cos(radians)

def tan(degrees):
    radians = math.radians(degrees)
    return math.tan(radians)

def asin(x):
    radians = math.asin(x)
    return math.degrees(radians)

def acos(x):
    radians = math.acos(x)
    return math.degrees(radians)

def atan(x):
    radians = math.atan(x)
    return math.degrees(radians)

def atan2(y, x):
    radians = math.atan2(y, x)
    return math.degrees(radians)

def minimize_lp(matrix):
    matrix = matrix.tolist()
    # Extract the coefficients of the objective function
    c = matrix[0][1:]

    # Extract the coefficients of the constraints
    A = [row[1:] for row in matrix[1:]]

    # Extract the right-hand sides of the constraints
    b = [row[0] for row in matrix[1:]]

    # Use Scipy's linprog function to solve the linear programming problem
    res = linprog(c, A_ub=A, b_ub=b, method="revised simplex")

    # Return the values of the decision variables
    return res.x


`

async function pyLoad() {
    const pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.2/full" })
    // In some distant future we propably should replace fetching pyodide from jsdelivr to fetching it from our own server. There is also script import in index.html.
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install("numpy");
    await micropip.install("sympy");
    await micropip.install("scipy");
    //await pyodide.loadPackage("math")
    pyodide.runPython(p)
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