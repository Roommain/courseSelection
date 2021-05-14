/*
 * @Description: 
 * @Author: litianfu
 * @Date: 2019-09-02 13:50:18
 * @LastEditTime: 2019-09-02 15:08:32
 * @LastEditors: litianfu
 */
import Jmwxmp from '../utils/jmwxmp'
const jmwxmp = new Jmwxmp({
  login: {
    url: 'http://172.17.0.249:8878/api', //示例接口地址
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded',
    code: 'code' //wx.login返回code上传服务器后台自定义字段名
  }
})
const host = 'http://172.17.0.249:8878/';
export {
  jmwxmp,
  host
}
// Vue.prototype.$jmwxmp = jmwxmp;
