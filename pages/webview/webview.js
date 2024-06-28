import config from '../../utils/config';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: config.getHomeUrl,
    message: {}
  },

  getmessage(e) {
    let obj = e.detail.data[e.detail.data.length - 1];

    this.setData({
      message:obj
    })
  },

  onShareAppMessage() {
    console.log('/pages/share/share?url=' + encodeURIComponent(this.data.message.url));
    return {
      title: this.data.message.title,
      path: '/pages/share/share?url=' + encodeURIComponent(this.data.message.url),
      imageUrl: this.data.imageUrl
    }
  },

  onLoad: function (options) {
    console.log('webview接收到的参数', options);

    //如果支付成功，这里重新刷新h5页面，并把支付成功的状态传递给h5
    if (options.src) {
      this.setData({
        src: decodeURI(options.src),
      });
    }
  },

});