# vicalial-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Technical debt:
Project is hard-coded to work on matrices, other types of data should also be added to support.

All checks and conversions for variable creation happen in AddDataWindow.vue, which is inapropriate place.

Solve issue with css locality

Bug: There should be only one FunctionChoice component visible at a time. As of now you can select cells from different matrices and that would create more that one FunctionChoice.

In some distant future we propably should replace fetching pyodide from jsdelivr to fetching it from our own server. There is also script import in index.html.

There is so many way to name multiplication of matrices: I should appropriately call them dot-products, cross-products and etc.

Rename all Matrix methods in a way that it would exactly match names of corresponding functions in numpy.

Just number of arguments is definetly not enough for function choice. We need like dynamic amount (for Extraction function), and typed arguments(for functions like Map and Reduce).

We hardcode relation selection-parent, but it should be more like parent-child-child-child...

Important for statements to be written from what expression they have come from, otherwise its easy to get super lost.

Workspace viewer.

Error viewer.

Simple mathematical exprssion should be possible to be done quicker and easier.

Add functions: slice, mapRows, mapColumns, replace map with mathElements, appendRows, appendColumns

Optimize cellStyles() function in StatementComponent

In FileWorkers.ts, it would prbably be meaningful to be more permissive to imperfections in user-submitted data, like extra emty elements on the ends/beginnings of lines

Make something like MatrixPreview component, i think it would be useful in a lot of places, like during export for example.

Allow user to choose format of saving.

Repair selectedStyle() temporal solution in MatrixView

In StatementComponent (second) make MatrixMethodTabs somehow collapsable

Scipy that supports linprog is going to be deprecated soon ,we have to change it to different function

3, 2, -5, -1
2, -1, 3, 13
1, 2, -1, 9



0, 1, -5, -1, 3
27, 1, -1, 0, 3
8, 1,-6,-1, 5
20, 1, -2, 1, 2