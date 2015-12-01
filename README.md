Ya-UI
===

[![Build Status](https://travis-ci.org/ali322/ya-ui.svg)](https://travis-ci.org/ali322/ya-ui)
[![Dependency Status](https://gemnasium.com/ali322/ya-ui.svg)](https://gemnasium.com/ali322/ya-ui)
[![Coverage Status](https://coveralls.io/repos/ali322/ya-ui/badge.svg?branch=master&service=github)](https://coveralls.io/github/ali322/ya-ui?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ali322/ya-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

web components build with React

###Directory structure


```
|- asset/ #font and background images etc
|- dist/     #build directory
|- example/
  |- selected/  #selected's example
  |- index.html #example index.html
|- src/      #source directory
  |- component/ # web component
  |- lib/ #helper and tool
  |- index.es6 # entry point
|- task/ #build tasks
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
    var Selected = yaui.component.Selected
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
    npm run develop-example
    ```

  - reqired work finished,start develop server

    ```shell
    npm start
    ```

2. release you own example
  - like develop workflow,build and inject work need to be done

    ```shell
    npm run deploy-example
    ```

  - then deploy example directory to your own server