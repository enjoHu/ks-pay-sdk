(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['ks-pay-sdk'] = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Request = /*#__PURE__*/function () {
    function Request(host) {
      _classCallCheck(this, Request);

      this.host = host;
    }

    _createClass(Request, [{
      key: "fetch",
      value: function fetch(requestURL, ks, data, method, resolve, reject) {
        var url = this.host + requestURL;
        ks.request({
          url: url,
          data: data,
          method: method,
          header: {
            'content-type': 'application/json'
          },
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(e) {
            reject(e);
          }
        });
      }
    }, {
      key: "get",
      value: function get(url, ks, data) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.fetch(url, ks, data, 'GET', resolve, reject);
        });
      }
    }, {
      key: "post",
      value: function post(url, ks, data) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          _this2.fetch(url, ks, data, 'POST', resolve, reject);
        });
      }
    }]);

    return Request;
  }();

  var CHANNEL_ORDER = '/paym-cashier/client/create/channelOrder';
  var PAY_RESULT = '/paym-cashier/client/search/payResult';
  var payURL = {
    dev: 'https://paym-cashier.guazi-cloud.com',
    pro: 'https://pay.guazi.com'
  };
  var API = {
    createChannelOrder: function createChannelOrder(_ref) {
      var env = _ref.env,
          ks = _ref.ks,
          params = _ref.params;
      var payRequest = new Request(payURL[env]);
      return payRequest.post(CHANNEL_ORDER, ks, params);
    },
    getPayResult: function getPayResult(_ref2) {
      var env = _ref2.env,
          ks = _ref2.ks,
          params = _ref2.params;
      var payRequest = new Request(payURL[env]);
      return payRequest.get(PAY_RESULT, ks, params);
    }
  };

  var SUCCESS_CODE = '0';

  var KsPaySDK = /*#__PURE__*/function () {
    function KsPaySDK(config) {
      _classCallCheck(this, KsPaySDK);

      this.config = config;
    }

    _createClass(KsPaySDK, [{
      key: "toPay",
      value: function toPay(config) {
        var env = config.env,
            ks = config.ks,
            requestSn = config.requestSn,
            open_id = config.open_id;
        var params = {
          paymentType: '223',
          requestSn: requestSn,
          openId: open_id
        };
        ks.showLoading({
          title: '加载中'
        });
        return new Promise(function (resolve, reject) {
          API.createChannelOrder({
            env: env,
            ks: ks,
            params: params
          }).then(function (res) {
            ks.hideLoading();
            var _res$data$data = res.data.data,
                code = _res$data$data.code,
                data = _res$data$data.data,
                message = _res$data$data.message;
            console.log('res.data.data', res.data.data);

            if (code === SUCCESS_CODE && data.appData) {
              var _JSON$parse = JSON.parse(data.appData),
                  order_no = _JSON$parse.order_no,
                  order_info_token = _JSON$parse.order_info_token;

              console.log('ks.pay before', ks.pay, order_no, order_info_token);
              ks.pay({
                serviceId: '1',
                orderInfo: {
                  order_no: order_no,
                  order_info_token: order_info_token
                },
                success: function success(res) {
                  return resolve(res);
                },
                fail: function fail(res) {
                  return reject(res);
                },
                complete: function complete(res) {
                  console.log('complete', res);
                }
              });
            } else {
              ks.showModal({
                showCancel: false,
                content: message
              });
              return reject(message);
            }
          });
        });
      }
    }, {
      key: "getPayResult",
      value: function getPayResult(config) {
        var env = config.env,
            ks = config.ks,
            requestSn = config.requestSn;
        var params = {
          requestSn: requestSn,
          productType: 'F2F_PAY'
        };
        ks.showLoading({
          title: '加载中'
        });
        return new Promise(function (resolve, reject) {
          API.getPayResult({
            env: env,
            ks: ks,
            params: params
          }).then(function (res) {
            ks.hideLoading();
            var _res$data$data2 = res.data.data,
                code = _res$data$data2.code,
                data = _res$data$data2.data,
                message = _res$data$data2.message;

            if (code === SUCCESS_CODE) {
              return resolve(data);
            } else {
              return reject(message);
            }
          });
        });
      }
    }]);

    return KsPaySDK;
  }();

  var ksPaySdk = new KsPaySDK(); // const toPay = ksPaySdk.toPay
   // module.exports = ksPaySdk

  return ksPaySdk;

})));
