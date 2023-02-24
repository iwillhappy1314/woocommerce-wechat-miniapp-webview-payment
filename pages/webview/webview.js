import config from '../../utils/config';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: config.getHomeUrl,
    },

    onLoad: function(options) {
        console.log('webview接收到的参数', options);

        //如果支付成功，这里重新刷新h5页面，并把支付成功的状态传递给h5
        if (options.src) {
            this.setData({
                src: decodeURI(options.src),
            });
        }
    },

});