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
