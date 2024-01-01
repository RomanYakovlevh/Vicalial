import { reactive } from 'vue';


const p = `
import numpy
import sympy
from math import *
import math
from scipy.optimize import linprog
from sympy.parsing.sympy_parser import parse_expr, auto_number, rationalize, auto_symbol

auto_number_and_ratonalize_transformation = (auto_symbol, auto_number, rationalize)

def ensureMatrix(M):
    print(f'M: {M}, type of M: {type(M)}')
    if type(M) == numpy.matrix:
        return M.tolist()
    else:
        return numpy.matrix(M).tolist()

def minimize_lp(matrix):
    matrix = matrix.tolist()
    # Extract the coefficients of the objective function
    c = matrix[0][1:]
    print(c)

    # Extract the coefficients of the constraints
    A = [row[1:] for row in matrix[1:]]
    print(A)

    # Extract the right-hand sides of the constraints
    b = [row[0] for row in matrix[1:]]
    print(b)

    # Use Scipy's linprog function to solve the linear programming problem
    res = linprog(c, A_eq=A, b_eq=b)

    # Return the values of the decision variables
    return res.x


`

async function pyLoad() {
    const pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.0/full" })
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

/* # Unused python code


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
*/