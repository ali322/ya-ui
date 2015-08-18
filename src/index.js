'use strict'
import GoTop from "./component/gotop.jsx";
import Dialog from "./component/dialog.jsx";
import Messager from "./component/messager.jsx";
import Loading from "./component/loading.jsx";
import Selected from "./component/selected.jsx";

require("normalize.css");
// require("font-awesome/css/font-awesome.css");
require("./theme/index.scss");

let yaui = {
    "component":{
        GoTop,
        Dialog,
        Messager,
        Loading,
        Selected
    }
};
export default yaui;