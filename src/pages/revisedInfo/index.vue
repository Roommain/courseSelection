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
                <!-- <van-field
                    :value="stuNumber"
                    @change="stuNumChange"
                    clearable
                    label="学号"
                    border
                    disabled
                    placeholder="请输入学号"
                    bind:click-icon="onClickIcon"
                /> -->
                <!-- <van-field
                    :value="username"
                    @change="nameChange"
                    clearable
                    label="姓名"
                    border
                    placeholder="请输入姓名"
                    bind:click-icon="onClickIcon"
                /> -->
                <!-- <van-field
                    :value="className"
                    @change="classChange"
                    clearable
                    label="班级"
                    border
                    placeholder="请输入班级"
                    bind:click-icon="onClickIcon"
                /> -->
                <van-field
                    :value="telPhone"
                    @change="phoneChange"
                    clearable
                    label="联系电话"
                    border
                    placeholder="请输入电话"
                    bind:click-icon="onClickIcon"
                />
                <van-field
                    :value="email"
                    @change="emailChange"
                    label="邮箱"
                    placeholder="请输入邮箱"
                    border
                />
            </van-cell-group>
            <div class="cont">
               <van-button type="primary" block @click="submit">提交</van-button> 
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
            stuNumber:'',
            username:'',
            className:'',
            telPhone:'',
            email:'',
            cookie:''
        }
    },
    created() {
        // this.getCode();
    },
    onShow() {
        this.getUserInfo();
    },
    methods: {
        goToLogin () {
            var url = '/pages/login/main';
            wx.navigateTo({
                url: url
            });
        },
        getUserInfo () {
            var _this = this;
            try {
                _this.cookie =  wx.getStorageSync('cookie');
            } catch (error) {
                
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/getstudentinfo', //仅为示例，并非真实的接口地址
                method:'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {;
                    if (res.data.success) {
                        _this.stuNumber = res.data.student.studentNumber
                        _this.username = res.data.student.studentName
                        _this.className = res.data.student.studentClass
                        _this.telPhone = res.data.student.tel
                        _this.email = res.data.student.email
                    }else {
                        $Message({
                            content: '请重新登陆再试',
                            type: 'warning'
                        });
                        // _this.goToLogin();
                    }
                }
            })
        },
        submit () {
            var _this = this;
            var studentStr = {
                studentNumber:_this.stuNumber,
                studentName:_this.username,
                studentClass:_this.className,
                email:_this.email,
                tel:_this.telPhone
            }
            var par = {
                studentStr:JSON.stringify(studentStr),
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/studenteditinfo', //仅为示例，并非真实的接口地址
                method:'POST',
                data:par,
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    if (res.data.success) {
                        $Message({
                            content: '修改成功',
                            type: 'success'
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
        nameChange (e) {
            this.username = e.mp.detail
        },
        classChange (e) {
            this.className = e.mp.detail
        },
        stuNumChange (e) {
            this.stuNumber = e.mp.detail
        },
        phoneChange (e) {
            this.telPhone = e.mp.detail
        },
        emailChange (e) {
            this.email = e.mp.detail
        }
    }, 
};
</script>

<style scoped>
.img {
    width: 100px;
    height: 40px;
}
.cont {
    margin: 10px;
}
</style>
