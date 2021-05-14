<!--
 * @Author: litianfu
 * @Date: 2019-08-15 14:13:36
 * @LastEditTime: 2019-09-20 18:15:28
 * @LastEditors: litianfu
 -->
<template>
    <div class="bg">
        <div class="Content">
            <div class="Week">
                <ul>
                    <li class="fl">/</li>
                    <li class="fl">日</li>
                    <li class="fl">一</li>
                    <li class="fl">二</li>
                    <li class="fl">三</li>
                    <li class="fl">四</li>
                    <li class="fl">五</li>
                    <li class="fl">六</li>
                </ul>
            </div>
            <div class="Source">
                <div class="Num fl">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                    </ul>
                </div>
            <!--     星期日课程信息-->
                <div class="Sun fl">
                    <ul class="KeCheng">
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                    </ul>
                </div>
            <!--     星期一课程信息-->
                <div class="Mon fl" v-for="(item,index) in classSchedule" :key="index">
                    <ul class="KeCheng">
                        <!-- <li class="SixiangzhengzhiBg" v-for="(item1,index1) in item" :key="index1"><p>{{item1}}</p></li> -->
                        <li :class="item1 == '' ? '':'SixiangzhengzhiBg'" v-for="(item1,index1) in item" :key="index1"><p>{{item1}}</p></li>
                    </ul>
                </div>
                <!--     星期六课程信息-->
                <div class="Sat fl">
                    <ul class="KeCheng">
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                        <li><p></p></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <web-view :src="src"></web-view> -->
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>

const { $Toast } = require('../../../static/iview/base/index');
const { $Message } = require('../../../static/iview/base/index');
export default {
    data() {
        return {
            border:false,
            loginBtnShow:true,
            classSchedule:[
                ['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],
            ]
        }
    },
    onShow () {
        this.classSchedule = [
            ['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],
        ]
        this.getClassSchedule();
    },
    methods: {
        goToLogin () {
            var url = '/pages/login/main';
            wx.navigateTo({
                url: url
            });
        },
        getClassSchedule () {
            var _this = this;
            try {
                _this.cookie =  wx.getStorageSync('cookie');
            } catch (error) {
                
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/getclassschedule', //仅为示例，并非真实的接口地址
                method:'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    if (res.data.success) {
                        res.data.classData.forEach(element => {
                            _this.modify(element.data);      
                        });
                    }else {
                        $Message({
                            content: '请重新登陆再试',
                            type: 'warning'
                        });
                    }
                }
            })
        },
        modify (arr) {
            var _this = this;
            if (arr[1] ==  '周一') {
                _this.changeTime(arr,0);
            }else if (arr[1] ==  '周二') {
                _this.changeTime(arr,1);
            }else if (arr[1] ==  '周三') {
                _this.changeTime(arr,2);
            }else if (arr[1] ==  '周四') {
                _this.changeTime(arr,3);
            }else if (arr[1] ==  '周五') {
                _this.changeTime(arr,4);
            }
        },
        changeTime (arr,i) {
            var _this = this;
            if (arr[0] ==  '8：00-9：40') {
                _this.classSchedule[i].splice(0,1,arr[2])
            }else if (arr[0] ==  '10：15-11：55') {
                _this.classSchedule[i].splice(1,1,arr[2])
            }else if (arr[0] ==  '14：00-15：40') {
                _this.classSchedule[i].splice(2,1,arr[2])
            }else if (arr[0] ==  '16：15-17：55') {
                _this.classSchedule[i].splice(3,1,arr[2])
            }else if (arr[0] ==  '19: 00-20：40') {
                _this.classSchedule[i].splice(4,1,arr[2])
            }
        }
    }, 
};
</script>

<style scoped>
div,form,ul,ol,li,span,p,dl,dt,dd,img{margin: 0;padding: 0;border: 0;}
h1,h2,h3,h4,h5,h6{margin: 0;padding: 0;font-size: 12px;font-weight: normal;}
ul,ol,li{list-style: none}  /*清除列表默认样式*/
/*设置浮动*/
.fl{float: left}
/*课程背景颜色*/
.SixiangzhengzhiBg{background-color: #4dc4cc}
.GaodengshuxueBg{background-color:#6fa1e0}
.TiyuBg{background-color: #82e27b}
.JavaBg{background-color: #eec291}
.WuliBg{background-color: #b15b7e}
.EnglishlisteningspeakingBg{background-color: #9d8fcc}
.Huodong{background-color: #fa809d}
.YingyuBg{background-color: #17b7e7}
.content{
  width: 100vw;
  height: 100vh;
}
.Week{
  width: 100vw;
  height: 30px;
  background-color: #fff;
  filter: alpha(opacity=60);
  opacity: 0.6;
}
.Week ul li{
  font-family: 微软雅黑;
  font-size: 14px;
  color: #333;
  text-align: center;
  width: 12.5vw;
  /* line-height: 56px; */
}
/*设置节次CSS规则*/
.Source{
  width: 100vw;
  height: 90vh;
}
.Num{
  width: 12.5vw;
  height: 90vh;
  background-color: #fff;
  filter: alpha(opacity=60);
  opacity: 0.6;
}
.Num ul li{
  font-family: 微软雅黑;
  font-size: 14px;
  color: #333;
  width: 12.5vw;
  height: 9vh;
  line-height: 9vh;
  text-align: center;
}
/*设置课程CSS规则*/
.Sun ul li{width: 12.5vw;height: 18vh;}
/* .Mon,Tue,Wed,Thu,Fri,Sat,Sun ul{margin-top: 1px;} */
.KeCheng li{
  width: 12.5vw;
  height: 18vh;
  border-radius: 5px;
  display: table;
  /* border: 1px solid #fff;
  box-shadow: inset 0 1px 8px #666; */
}
.KeCheng li p{
    display: table-cell;
    vertical-align: middle;
    font-family: 微软雅黑;
    color: #fff;
    font-size: 12px;
    width: 12.5vw;
    height: 18vh;
    text-align: center;
}
</style>
