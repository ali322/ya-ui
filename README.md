Ya-UI
===

[![Circle CI](https://circleci.com/gh/ali322/ya-ui/tree/master.svg?style=svg)](https://circleci.com/gh/ali322/ya-ui/tree/master)
[![Dependency Status](https://gemnasium.com/ali322/ya-ui.svg)](https://gemnasium.com/ali322/ya-ui)
[![Coverage Status](https://coveralls.io/repos/ali322/ya-ui/badge.svg?branch=master&service=github)](https://coveralls.io/github/ali322/ya-ui?branch=master)

web components build with React

###Directory structure


```
|- dist/     #build directory
|- src/      #source directory
  |- component/ # web component
  |- util/
  |- index.js # entry point
|- package.json
```

###Get Started

1. install via npm

    ```shell
    npm install
    ```
    or directly include yaui.js into page
2. require this module in your code

    ```javascript
    var yaui = require("ya-ui");
    var Loading = yaui.component.Loading
    // coding
    ```

### Customize build
  ```shell
  npm run build
  ```
### Customize release
  ```shell
  npm run release
  ```

### Develop examples
1. develop with your own example
  - when start new example,some build and inject work need to be done

    ```shell
    npm run example-build
    npm run develop-example
    ```

  - reqired work finished,start develop server

    ```shell
    npm run develop
    ```

2. release you own example
  - like develop workflow,build and inject work need to be done

    ```shell
    npm run example-prod
    npm run deploy-example
    ```

  - then start to preview
  
    ```shell
    npm start
    ```
