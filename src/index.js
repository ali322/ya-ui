'use strict'
import GoTop from "./component/gotop.jsx";
import Dialog from "./component/dialog.jsx";
import Messager from "./component/messager.jsx";
import Loading from "./component/loading.jsx";
import Selected from "./component/selected.jsx";
import LazyLoad from "./component/lazyload.jsx";
import Image from "./component/core/image.jsx";
import Sticky from "./component/sticky.jsx";
import Popup from "./component/popup.jsx";

require("normalize.css");
// require("font-awesome/css/font-awesome.css");
require("./theme/index.scss");

const yaui = {
    "component":{
        GoTop,
        Dialog,
        Messager,
        Loading,
        Selected,
        Sticky,
        Popup,
        LazyLoad,
        Image
    }
};
export default yaui;