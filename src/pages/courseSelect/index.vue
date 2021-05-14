<!--
 * @Author: litianfu
 * @Date: 2019-08-15 14:13:36
 * @LastEditTime: 2019-09-20 18:15:28
 * @LastEditors: litianfu
 -->
<template>
    <div class="bg">
        <div style="padding: 5px">
            <div class="box" v-for="(item,index) in currilumList" :key="index" @click="change(item.classNumber)">
                <p class="name">{{item.className}}</p>
                <p class="txt">{{item.week+'、'+item.classTime+'、'+item.cplace+'、'+'任教（'+item.classTeacher +'）' +'、剩余（'+item.surplus+'）'}}</p>
            </div>
            <!-- <i-swipeout v-for="(item,index) in currilumList" :key="index"  i-class="i-swipeout-demo-item" :actions="actions" @change="change" operateWidth="300">
                <view slot="content">
                    <i-cell 
                        i-class="i-cell-padding" 
                        :title="item.className" 
                        :label="item.week+'、'+item.classTime+'、'+item.cplace+'、'+'、任教（'+item.classTeacher +'）' +'、剩余（'+item.surplus+'）'">
                    </i-cell>
                </view>
            </i-swipeout> -->
        </div>
        <i-action-sheet :visible="visible" :actions="actions1" show-cancel @cancel="handleCancel1" @iclick="handleClickItem1" />
        <!-- <web-view :src="src"></web-view> -->
        <i-message id="message" />
    </div>
</template>

<script>
const { $Message } = require('../../../static/iview/base/index');
export default {
    data() {
        return {
            cookie:'',
            visible: false,
            border:false,
            classNumber:'',
            loginBtnShow:true,
            actions : [
                {
                    name : '选择',
                    color : '#fff',
                    fontsize : '20',
                    width : 100,
                    icon : 'like',
                    background : '#ed3f14'
                }
            ],
            actions1:[
                {
                    name: '确认选择',
                }
            ],
            currilumList:[]
        }
    },
    onShow () {
        this.getList();
    },
    methods: {
        getList () {
            var _this = this;
            try {
                _this.cookie =  wx.getStorageSync('cookie');
            } catch (error) {
                
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/getcurriculumlist', //仅为示例，并非真实的接口地址
                method:'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    if (res.data.success) {
                        _this.currilumList = res.data.currilumList
                    }else {
                        _this.goToLogin();
                    }
                }
            })
        },
        handleCancel1 () {
            this.visible = false;
        },
        handleClickItem1 ({mp}) {
            const index = mp.detail.index + 1
            console.log(index)
            var _this = this;
            var par = {
                classNumber:_this.classNumber,
                enableStatus:index,
            }
            wx.request({
                url: this.$apiHost+'/jxl/demo/addrecord', //仅为示例，并非真实的接口地址
                method:'POST',
                data:par,
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    _this.visible = false
                    if (res.data.success) {
                        $Message({
                            content: '选课成功',
                            type: 'success'
                        });
                    }else {
                        $Message({
                            content: '选课无效',
                            type: 'warning'
                        });
                    }
                }
            })
        },
        change (index) {
            this.classNumber = index;
            this.visible = true;
        },
        goToLogin () {
            var url = '/pages/login/main';
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
.login-btn {
    width: 100%;
    height: 100px;
    padding-top: 50px;
    text-align: center;
}
.box {
    width: 94%;
    margin: 0 auto 6px;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: cadetblue;
    color: #fff;
}
.name {
    font-size: 18px;
}
.txt {
    font-size: 14px;
}
</style>
