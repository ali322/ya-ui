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
import Dropdown from "./component/dropdown.jsx";
import Checkbox from "./component/checkbox.jsx";
import Slider from "./component/slider/slider.jsx";
import Slide from "./component/slider/slide.jsx";
import DatetimePicker from "./component/datetimepicker/datetimepicker.jsx";
import DatetimeInput from "./component/datetimepicker/datetimeinput.jsx";

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
        Dropdown,
        Checkbox,
        Sticky,
        Popup,
        LazyLoad,
        Image,
        Slider,
        Slide,
        DatetimePicker,
        DatetimeInput
    }
};
export default yaui;