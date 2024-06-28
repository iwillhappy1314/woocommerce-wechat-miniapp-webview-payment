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

    // 处理扫描跳转： https://developers.weixin.qq.com/miniprogram/introduction/qrcode.html#%E4%BA%8C%E7%BB%B4%E7%A0%81%E8%B7%B3%E8%BD%AC%E8%A7%84%E5%88%99
    // 小程序后台设置：开发 > 开发管理 > 扫普通链接二维码打开小程序: 二维码规则: a.cytd.fun/miniapp?src=https, 小程序功能页面: pages/webview/webview, 测试链接: a.cytd.fun/miniapp?src=https%3A%2F%2Fa.cytd.fun%2Fproduct%2Fxq-b105%2F
    // WordPress 里面添加页面
    /*
    Router::routes([
      'miniapp' => function (){
        wp_redirect($_GET[ 'src' ]);
      },
    ]);
    */
    if (options.q) {
      this.setData({
          src: decodeURIComponent(options.q),
      });
    }

    //如果支付成功，这里重新刷新h5页面，并把支付成功的状态传递给h5
    if (options.src) {
      this.setData({
        src: decodeURI(options.src),
      });
    }
  },

});