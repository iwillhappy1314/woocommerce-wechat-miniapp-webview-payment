Page({

    data: {
  
    },


   /*
    需要在 web 页面 head 中加入 
    <script>
      wx.miniProgram.postMessage({data: {url: '<?= wprs_get_current_url();?>', title: '<?php the_title(); ?>'}});
    </script>
   */
    onLoad: function (options) {
      this.setData({
        url:decodeURIComponent(options.url)
      })
    },
  
  });