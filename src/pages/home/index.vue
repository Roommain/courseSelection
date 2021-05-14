<!--
 * @Author: litianfu
 * @Date: 2019-08-15 14:13:36
 * @LastEditTime: 2019-09-20 18:15:28
 * @LastEditors: litianfu
 -->
<template>
    <div class="bg">
        <van-notice-bar class="notice"
        mode="closeable"
        text="2020年重庆邮电大学第一次统一选课，错过这一次要再等一年"
        />  
        <div class="bg-img">
            <img src="/static/img/xk.jpg" alt="">
        </div>
        <div class="cont">
            <div v-for="(item,index) in list" :key="index" class="box" @click="goNavigateTo(item.url)">
                {{item.text}}
            </div>
        </div>
        <i-toast id="toast" />

    </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index');
export default {
    data() {
        return {
            list:[
                {text:'选课',url:'/pages/courseSelect/main'},
                {text:'已选课程',url:'/pages/viewSelected/main'},
                {text:'课程表',url:'/pages/classSchedule/main'},
                // {text:'修改资料',url:'/pages/revisedInfo/main'},
            ]

        }
    },
    methods: {
        goNavigateTo (url) {
            wx.navigateTo({
                url: url
            });
        },
    }, 
    // onLoad (val) {
    //     var _this = this
    //     // _this.src = val.url;
    //     if (val.url) {
    //         _this.src = val.url;
    //     } else {
    //          _this.src = '复制整句话￥jPtZYzLkhQX￥后打开手机淘宝，即可跳转至产品界面';
    //     }
    // } 
};
</script>

<style scoped>
.bg {
  position: relative;
  /* background-color: #5ebaff; */
  width: 100%;
  height: 100%;
}
.bg-img {
  /* position: absolute;
  top: 200px;
  left: 0;
  right: 0; */
  width: 100%;
  height: 300px;
}
.bg-img img {
  width: 100%;
  height: 100%;
}
.notice {
    position: fixed;
    top: 0;
    width: 100%;
    height: 20px;
}
.cont {
    margin: 10px;
}
.box {
    float: left;
    width: 98%;
    height: 100px;
    margin: 1%;
    background-color: cadetblue;
    text-align: center;
    line-height: 100px;
    color: #fff;
    border-radius: 5px;
}
</style>
