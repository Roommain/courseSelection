/*
 * @Description: 
 * @Author: litianfu
 * @Date: 2019-08-30 18:25:50
 * @LastEditTime: 2019-09-02 16:25:15
 * @LastEditors: litianfu
 */
//定义请求地址
const host = 'http://172.17.0.249:8878/';
const token = wx.getStorageSync("token") || "1"; //同步获取token
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        token: token,
        'content-type': 'application/x-www-form-urlencoded' // 默认转为json格式
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}

function get(obj) {
  return request(obj.url, 'GET', obj.data)
}

function post(obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post
}
