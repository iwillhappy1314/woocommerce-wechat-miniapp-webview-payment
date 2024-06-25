import config from '../../utils/config';

Page({
  data: {
    copyRight: config.getWebsiteName
  },

  //h5传过来的参数
  onLoad: function (options) {
    this.goPay(options);
  },

  rePay: function () {
    wx.navigateTo({
        url: '/pages/wePay/wePay?order_id=' + this.orderID,
    })
  },

  cancelPay: function () {
    wx.navigateTo({
        url: '../webview/webview?src=' + encodeURI(config.getHomeUrl + 'checkout/'),
    })
  },

  //微信支付
  goPay(payData) {

    wx.login({
      success(res) {
        if (res.code) {

          // 请求登录后端，获取open_id
          wx.request({
            url: config.getRootUrl + 'wc-api/wprs-wc-wechatpay-mini-app-login',
            data: {
              code: res.code,
            },
            success(res) {

              // 保存小程序登录信息
              wx.setStorageSync('open_id', res.data.data.openid);

              // 支付请求
              wx.request({
                url: config.getRootUrl + 'wc-api/wprs-wc-wechatpay-mini-app-bridge',
                method: 'POST',
                data: {
                  open_id: res.data.data.openid,
                  from: 'mini_app',
                  order_id: payData.order_id,
                },
                success(res) {

                  console.log(res.data);

                  var payment_data = res.data.data;

                  console.log(payment_data);

                  if (res.data.success) {
                    // 发送支付请求
                    wx.requestPayment({
                      timeStamp: payment_data.timeStamp,
                      nonceStr: payment_data.nonceStr,
                      package: decodeURIComponent(payment_data.package),
                      signType: 'MD5',
                      paySign: payment_data.paySign,
                      success(res) {
                        console.log('支付成功', res);
                        // 支付成功以后，再跳回webview页，并把支付成功状态传回去
                        wx.navigateTo({
                          url: '../webview/webview?src=' + encodeURI(payment_data.return_url),
                        });
                      },
                      fail(err) {
                        wx.showModal({
                          title: '支付请求，请重新支付',
                          content: err,
                        })
                      },
                    });
                  } else {

                    wx.showModal({
                      title: '支付失败',
                      content: payment_data.err_code_des,
                    })

                  }


                },
                fail(res) {
                  wx.showModal({
                    title: '获取支付信息失败'
                  })
                },
              });

            },
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      },
    });

  },
});