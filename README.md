Ya-UI
===

web components build with React and Reflux

Directory structure
===

|- dist/     #build directory
|- src/      #source directory
  |- action/ # action of flux
  |- component/ # web component
  |- store/  #store of flux
  |- util/
  |- index.js # entry point
|- package.json

Get Started
===
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

