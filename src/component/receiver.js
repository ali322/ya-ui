'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../../shared/lib/util.es6");
var serverUtil = require("../lib/util");
var Receiver = serverUtil.requireWebComponentFrom("receiver");
var ReceiverForm = serverUtil.requireWebComponentFrom("receiverform");

var receiver = function(req, res,next) {
    var config = req.app.locals.config;
    var user = req.session.user;
    util.apiRequest(config.api.receiverByUser.url, {
        memberId: user.memberId
    }).then(function(resp) {
        if (resp.code === "success") {
            var receivers = resp.addressList;
            var initialState = {
                isFetched: true,
                receivers: receivers
            };
            var markup = serverUtil.renderWebComponent(Receiver({
                initialState: initialState
            }));
            res.render('receiver', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(resp.msg))
        }
    }).fail(function(resp){
        next(new Error("api response failed"))
    })
}

var addReceiver = function(req, res) {
    var initialState = {
        isFetched: true,
        receiver: {
            isDefault: true,
            provinces: [{
                value: "",
                label: "请选择"
            }],
            cities: [{
                value: "",
                label: "请选择"
            }],
            districts: [{
                value: "",
                label: "请选择"
            }]
        },
    };
    var markup = serverUtil.renderWebComponent(ReceiverForm({
        initialState: initialState
    }));
    res.render('receiverform', {
        markup: markup,
        initialState: initialState
    })

}

var updateReceiver = function(req, res, next) {
    var id = req.params.id;
    var config = req.app.locals.config;
    var user = req.session.user;
    util.apiRequest(config.api.receiverById.url, {
        addressId:id
    }).then(function(resp) {
        if (resp.code === "success") {
            var address = resp.address;
            var receiver = {
                id: address.id,
                consignee: address.name,
                mobile: address.mobileNumber,
                zipcode: address.zipcode,
                address: address.address,
                province: address.provinceCode,
                city: address.cityCode,
                district: address.districtCode,
                provinces: [{
                    value: "",
                    label: "请选择"
                }],
                cities: [{
                    value: "",
                    label: "请选择"
                }],
                districts: [{
                    value: "",
                    label: "请选择"
                }],
                isDefault: address.defaultChecked === 1
            };
            var initialState = {
                isFetched: true,
                receiver: receiver,
            };
            if(req.xhr === true){
                res.json(initialState);
            }else{
                var markup = serverUtil.renderWebComponent(ReceiverForm({
                    initialState: initialState
                }));
                res.render('receiverform', {
                    markup: markup,
                    initialState: initialState
                })
            }
        } else {
            next(new Error(resp.msg));
        }
    })
}

var saveReceiver = function(req, res, next) {
    if (req.xhr === false) {
        return;
    }
    var config = req.app.locals.config;
    var user = req.session.user;
    var id = req.body.id;
    var receiver = {
        loginToken: user.loginToken,
        name: req.body.consignee,
        provinceCode: req.body.provincecode,
        provinceName: req.body.province,
        cityName: req.body.city,
        cityCode: req.body.citycode,
        districtName: req.body.district,
        districtCode: req.body.districtcode,
        address: req.body.address,
        zipcode: req.body.zipcode,
        mobileNumber: req.body.mobile,
        defaultChecked: req.body.isdefault
    }
    if (id !== "") {
        receiver = _.extend(receiver, {
            memberDlvAddressId: req.body.id
        })
        // console.log('update receiver', receiver)
        util.apiRequest(config.api.updateReceiver.url, receiver).then(function(resp) {
            if(resp.code === "success"){
                res.json({
                    receiverSaved:true
                })
            }else{
                res.json({
                    receiverSaved:false,
                    errMsg:resp.msg
                })
            }
        })
    } else {
        util.apiRequest(config.api.addReceiver.url, receiver).then(function(resp) {
            // console.log('resp', resp)
            if(resp.code === "success"){
                res.json({
                    receiverSaved:true
                })
            }else{
                res.json({
                    receiverSaved:false,
                    errMsg:resp.msg
                })
            }
        })
    }
}

var cascadeArea = function(req, res) {
    if (req.xhr !== true) {
        return;
    }
    var config = req.app.locals.config;
    var isProvince = req.query.isprovince;
    var code = req.query.code;
    if(isProvince === "true"){
        code = "CATALOG_REGION";
    }
    util.apiRequest(config.api.cascadeArea.url, {
        nodecode: code, //CATALOG_REGION 查询省
        // isProvice: isProvince
    }).then(function(resp) {
        if (resp.code === "success") {
            var items = [];
            _.each(resp.dictionaryList, function(v, k) {
                items.push({
                    label: v.name,
                    value: v.code
                })
            });
            res.json({
                isFetched: true,
                items: items
            });
        } else {
            res.json({
                isFetched: false,
                errMsg: resp.msg
            })
        }
    })
}

module.exports = {
    receiver: receiver,
    addReceiver: addReceiver,
    updateReceiver: updateReceiver,
    saveReceiver: saveReceiver,
    cascadeArea: cascadeArea
};
