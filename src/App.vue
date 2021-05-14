<!--
 * @LastEditTime: 2019-09-17 11:26:51
 * @LastEditors: litianfu
 -->
<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync('logs', logs)
    // }
  },
  methods: {
    
  },
  onLaunch () {
      var _this = this;
      // _this.$jmwxmp.checkUpdate({
      //     updateReady () {
      //         var _that = this;
      //         _this.$jmwxmp.showModal({
      //             content: '发现新版本，是否更新',
      //             showCancel: true,
      //             confirmText: '立即更新'
      //         }).then(function(){
      //           _that.applyUpdate();
      //         });
      //     },
      //     updateFailed () {
      //       wx.showToast({
      //           title: '更新失败，请删除小程序重新搜索进入！',
      //           mask: true
      //       });
      //     },
      //     updateWX () {
      //       wx.showToast({
      //           title: '当前微信版本过低，请更新微信！',
      //           mask: true
      //       });
      //     }
      // });
  }

}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
body,html{height:100%}
</style>
