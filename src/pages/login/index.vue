<!--
 * @Author: litianfu
 * @Date: 2019-08-15 14:13:36
 * @LastEditTime: 2019-09-20 18:15:28
 * @LastEditors: litianfu
 -->
<template>
    <div class="bg">
        <div>           
            <van-cell-group>
                <van-picker :columns="columns" @change="onChange" />
                <van-field
                    :value="username"
                    @change="nameChange"
                    clearable
                    label="用户名"
                    border
                    icon="user-o"
                    placeholder="请输入用户名"
                    bind:click-icon="onClickIcon"
                />

                <van-field
                    :value="password"
                    @change="passwordChange"
                    type="password"
                    label="密码"
                    icon="user-o"
                    placeholder="请输入密码"
                    border
                />
            </van-cell-group>
            <!-- <div class="user clearfix">
                <van-radio-group :value="radio" @change="onChange">
                    <div class="f-l">
                        <van-radio name="1">学生</van-radio>
                    </div>
                    <div class="f-r">
                        <van-radio name="2">管理员</van-radio>
                    </div>  
                </van-radio-group>                
            </div> -->
            <div class="cont clearfix">
               <van-button type="primary" block @click="login">登录</van-button> 
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
            username:'',
            password:'',
            radio:'1',
            src:this.$apiHost+'/jxl/Kaptcha',
            columns:['周一','周二','周三','周四','周五','周六','周日']
        }
    },
    created() {
        // this.getCode();
    },
    methods: {
        onChange (e) {
            this.radio = e.target[0]
        },
        login () {
            var _this = this;
            var par = {
                username:this.username,
                type:_this.radio,
                password:this.password
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/loginlocal', //仅为示例，并非真实的接口地址
                method:'POST',
                data:par,
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                },
                success (res) {
                    console.log(res);
                    if (res.data.success) {
                        wx.setStorage({
                            key:"cookie",
                            data:res.cookies[0]
                        })
                        if (_this.radio == '2') {
                            wx.redirectTo({
                                url: '/pages/admin/main'
                            }); 
                        }else {
                            wx.switchTab({
                                url: '/pages/user/main'
                            });                            
                        }
                        $Message({
                            content: '登录成功',
                            type: 'success'
                        });
                    }else {
                        $Message({
                            content: '检查账号密码是否正确',
                            type: 'warning'
                        });
                    }
                }
            })
        },
        nameChange (e) {
            this.username = e.mp.detail
        },
        passwordChange (e) {
            this.password = e.mp.detail
        },
        codeChange (e) {
            this.code = e.mp.detail
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
.clearfix:after{
    content:".";        
    display:block;        
    height:0;        
    clear:both;        
    visibility:hidden;        
}
.img {
    width: 100px;
    height: 40px;
}
.cont {
    margin: 10px;
}
.f-l {
    float: left;
}
.f-r {
    float: right;
}
.user {
    margin: 20px 10px;
}
</style>
