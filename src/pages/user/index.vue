<!--
 * @Author: litianfu
 * @Date: 2019-08-15 14:13:36
 * @LastEditTime: 2019-09-20 18:15:28
 * @LastEditors: litianfu
 -->
<template>
    <div class="bg">
        <!-- <div class="login-btn" v-show="loginBtnShow">
            <van-button type="primary" @click="goToLogin">前往登陆</van-button>
        </div> -->
        <div v-show="!loginBtnShow">
            <div class="user-box">
                <div class="avatar">
                    <i-avatar :src="avatarUrl" shape="square" size="large">{{avatar}}</i-avatar>
                    <button class="get-info" open-type="getUserInfo" size="mini" lang="zh_CN" @getuserinfo="onGotUserInfo"></button>
                </div>
                <div class="name">{{studentinfo.studentName}}</div> 
                <div class="stunum">{{studentinfo.studentNumber}}</div>               
            </div>
            <div class="span">
                <span>性别：女</span>
                <span class="right">统一识别码：1650252</span>
            </div>    
            <div class="span">
                <span>年级：2016级</span>
                <span class="right">班级：{{studentinfo.studentClass}}</span>
            </div>  
            <div class="span">
                <span>学院：软件工程学院</span>
                <span class="right">专业：软件工程</span>                    
            </div>
            <div class="span">
                <span>邮箱:{{studentinfo.email}}</span>
                <span class="right">电话:{{studentinfo.tel}}</span>                    
            </div>
            <div class="xgcont">
                <van-button type="danger" block @click="goNavigateTo('/pages/revisedInfo/main')">修改资料</van-button>
            </div>
            
            <!-- <div class="avatar">
                <i-avatar :src="avatarUrl" shape="square" size="large">{{avatar}}</i-avatar>
                <button class="get-info" open-type="getUserInfo" size="mini" lang="zh_CN" @getuserinfo="onGotUserInfo"></button>
            </div> -->
            <!-- <div class="name">学生姓名：{{studentinfo.studentName}}</div> -->
            <van-cell-group :border="border"> 
            <!-- <van-cell :title="studentinfo.studentName" border=false /> -->
            <!-- <van-cell title="学号" :value="studentinfo.studentNumber" /> -->
            <!-- <van-cell title="邮箱" :value="studentinfo.email" />
            <van-cell title="班级" :value="studentinfo.studentClass" />
            <van-cell title="电话" :value="studentinfo.tel" /> -->
            <!-- <van-cell is-link title="单元格" link-type="navigateTo" url="/pages/login/main"/> -->
            </van-cell-group>
            <div class="cont">
                <van-button type="primary" block @click="logout">注销</van-button>
            </div>            
        </div>

        <!-- <web-view :src="src"></web-view> -->
        <i-toast id="toast" />
    </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index');
export default {
    data() {
        return {
            avatar:'哈',
            border:false,
            loginBtnShow:true,
            cookie:'',
            studentinfo:{},
            avatarUrl:''
        }
    },
    created() {
    },
    onShow() {
        this.getUserInfo();
    },
    methods: {
        goNavigateTo (url) {
            wx.navigateTo({
                url: url
            });
        },
        onGotUserInfo () {
            var _this = this;
            wx.getUserInfo({
                success: function(res) {
                    var userInfo = res.userInfo
                    _this.avatarUrl = userInfo.avatarUrl
                }
            })
        },
        getAvatar (str) {
            var strs = str+''
            this.avatar = strs.substring(0,1);
        },
        logout () {
            var _this = this;
            wx.request({
                url: this.$apiHost+'/jxl/demo/logout', //仅为示例，并非真实的接口地址
                method:'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    console.log(res);
                    if (res.data.success) {
                        wx.removeStorageSync('cookie')
                        _this.goToLogin();
                        // _this.loginBtnShow = true;
                    }else {
                        // _this.loginBtnShow = false;
                    }
                }
            })
        },
        goToLogin () {
            var url = '/pages/login/main';
            wx.redirectTo({
                url: url
            });
        },
        getUserInfo () {
            var _this = this;
            try {
                _this.cookie =  wx.getStorageSync('cookie');
                console.log(_this.cookie);
            } catch (error) {
                
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/getstudentinfo', //仅为示例，并非真实的接口地址
                method:'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    console.log(res);
                    if (res.data.success) {
                        _this.studentinfo = res.data.student
                        _this.loginBtnShow = false;
                        _this.getAvatar(res.data.student.studentName);
                    }else {
                        _this.goToLogin();
                        _this.loginBtnShow = true;
                    }
                }
            })
        }
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
.login-btn {
    width: 100%;
    height: 100px;
    padding-top: 50px;
    text-align: center;
}
.name {
    position: absolute;
    top: 5px;
    left: 50px;
    font-size: 16px;
    padding: 10px;
    /* color: #44bb00; */
}
.avatar {
    position: relative;
    padding: 10px;
}
.cont {
    margin:10px;
}
.xgcont {
    margin: 10px;
}
.get-info {
    position: absolute;
    left: 10px;
    z-index: 10;
    width: 50px;
    height: 50px;
    opacity: 0;
}
.user-box {
    position: relative;
}
.stunum {
    position: absolute;
    top:35px;
    left: 60px;
    font-size: 12px;
}
.span {
    margin: 10px;
    font-size: 12px;
}
.right {
    float: right;
}
</style>
