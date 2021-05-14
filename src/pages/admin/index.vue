<!--
 * @Author: litianfu
 * @Date: 2019-08-15 14:13:36
 * @LastEditTime: 2019-09-20 18:15:28
 * @LastEditors: litianfu
 -->
<template>
    <div class="bg">
        <div>
            <van-dropdown-menu><van-dropdown-item :value="value1" :options="option1" @change="changeWeek"/></van-dropdown-menu>
            <van-dropdown-menu><van-dropdown-item :value="value2" :options="option2" @change="changeTime" /></van-dropdown-menu>
            <van-cell-group>
                <van-field
                    :value="className"
                    @change="nameChange"
                    clearable
                    label="课程名称"
                    border
                    placeholder="请输入课程名"
                    bind:click-icon="onClickIcon"
                />
                <van-field
                    :value="classTeacher"
                    @change="classTeacherChange"
                    label="老师"
                    placeholder="请输入老师"
                    border
                />
                <van-field
                    :value="cplace"
                    @change="cplaceChange"
                    clearable
                    label="教室"
                    border
                    placeholder="请输入教室"
                    bind:click-icon="onClickIcon"
                />
                <van-field
                    :value="surplus"
                    @change="surplusChange"
                    label="名额"
                    placeholder="请输入名额"
                    border
                />
            </van-cell-group>
            <van-dropdown-menu><van-dropdown-item :value="classCategory" :options="option3" @change="changeType"/></van-dropdown-menu>
            <div class="cont clearfix">
               <van-button type="primary" block @click="add">确认新增</van-button> 
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
            cookie:'',
            classCategory: 1,
            className: "",
            classTeacher: "",
            cplace: "",
            surplus: "",
            radio:'',
            value1:'周一',
            value2:'8：00-9：40',
            src:this.$apiHost+'/jxl/Kaptcha',
            option1:[
                { text: '周一', value: '周一' },
                { text: '周二', value: '周二' },
                { text: '周三', value: '周三' },
                { text: '周四', value: '周四' },
                { text: '周五', value: '周五' }
            ],
            option2:[
                { text: '8：00-9：40', value: '8：00-9：40' },
                { text: '10：15-11：55', value: '10：15-11：55' },
                { text: '14：00-15：40', value: '14：00-15：40' },
                { text: '16：15-17：55', value: '16：15-17：55' },
                { text: '19: 00-20：40', value: '19: 00-20：40' }
            ],
            option3:[
                { text: '必修', value: 1 },
                { text: '选修', value: 2 },
                { text: '限选', value: 3 }
            ],
        }
    },
    created() {
        // this.getCode();
    },
    methods: {
        changeWeek (val) {
            this.value1 = val.mp.detail;
        },
        changeTime (val) {
            this.value2 = val.mp.detail;
        },
        changeType (val) {
            this.classCategory = val.mp.detail;
        },
        onChange (e) {
            this.radio = e.target[0]
        },
        add () {
            var _this = this;
            try {
                _this.cookie =  wx.getStorageSync('cookie');
                console.log(_this.cookie);
            } catch (error) {
                
            }
            var arr = []
            var par = {
                classCategory: _this.classCategory,
                className: _this.className,
                classTeacher: _this.classTeacher,
                classTime: _this.value2,
                cplace: _this.cplace,
                surplus: _this.surplus,
                week: _this.value1
            }
            arr.push(par);
            wx.request({
                url: this.$apiHost+'/jxl/demo/addcurriculumlist', //仅为示例，并非真实的接口地址
                method:'POST',
                data:JSON.stringify(arr),
                header: {
                    'content-type': 'application/json', // 默认值
                    'Cookie': _this.cookie
                },
                success (res) {
                    if (res.data.success) {
                        $Message({
                            content: '新增成功',
                            type: 'success'
                        });
                    }else {
                        $Message({
                            content: '新增失败',
                            type: 'warning'
                        });
                    }
                }
            })
        },
        nameChange (e) {
            this.className = e.mp.detail
        },
        classTeacherChange (e) {
            this.classTeacher = e.mp.detail
        },
        cplaceChange (e) {
            this.cplace = e.mp.detail
        },
        surplusChange (e) {
            this.surplus = e.mp.detail
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
