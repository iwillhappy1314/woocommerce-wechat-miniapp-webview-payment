## 怎么实现在小程序中的微信登录

可以复用公众号登录功能

## 修要修改的内容

1. 修改 utils/config.js 中的相关网址和网站名称
2. 修改 project.config.json 中的 appid

## 怎么开发调试

1. 在微信开发者工具中导入此项目，修改项目ID
2. WordPress后台安装 https://wordpress.org/plugins/wenprise-wechatpay-checkout-for-woocommerce/ 插件，并正确设置需要的选项。
3. 微信公众号和小程序后台设置登录微信开发者工具的微信号为开发者
4. 发布体验版和正式版时，要在微信小程序后台正确设置各种合法域名。
