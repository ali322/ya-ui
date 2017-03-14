Ya-UI
===

[![Join the chat at https://gitter.im/ali322/ya-ui](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ali322/ya-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
|- package.json
```

###Get Started

1. install via npm

    ```shell
    npm install ya-ui
    ```
    or directly include `dist/ya-ui.js` and `dist/ya-ui.css` into page
2. require this module in your code

    ```javascript
    import { Selected } from 'ya-ui
    // coding
    ```

### Customize build
  ```shell
  npm run build
  ```