'use strict'
import GoTop from "./component/gotop.jsx";
import Selected from "./component/selected/selected.jsx";
import SelectedSlide from "./component/selected/selectedslide.jsx";
import LazyLoad from "./component/lazyload/lazyload.jsx";
import Image from "./component/lazyload/image.jsx";
import Sticky from "./component/sticky.jsx";
import Popup from "./component/popup.jsx";
import Dropdown from "./component/dropdown.jsx";
import Slider from "./component/slider/slider.jsx";
import Slide from "./component/slider/slide.jsx";
import DatetimePicker from "./component/datetimepicker/datetimepicker.jsx";
import DatetimeInput from "./component/datetimepicker/datetimeinput.jsx";
import NumberPicker from "./component/numberpicker.jsx";
import Alert from "./component/alert.jsx";
import PullHook from "./component/pullhook.jsx";
import Checkbox from "./component/form/checkbox.jsx";

// require("normalize.css");
// require("font-awesome/css/font-awesome.css");
require("./theme/index.styl");

const yaui = {
    "component":{
        GoTop,
        Selected,
        SelectedSlide,
        Dropdown,
        Sticky,
        Popup,
        LazyLoad,
        Image,
        Slider,
        Slide,
        DatetimePicker,
        DatetimeInput,
        NumberPicker,
        Alert,
        PullHook,
        Checkbox
    }
};
export default yaui;