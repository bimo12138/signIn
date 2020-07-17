// pages/sign/sign.js
const app = getApp();
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        start_time: "",
        status: false,
        pk: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let pk = options.pk;
        wx.request({
          url: app.globalData.base_url + 'get-task',
          method: "GET",
          data: {
              pk
          },
          success: (res) => {
            let task = JSON.parse(res.data.task);
            this.setData({
                title: task.title,
                start_time: task.upload_time.slice(0, 19),
                status: false?"進行中":"已結束",
                pk
            })
            
          }
        })
    },
    sign: function() {
        let username;
        if (app.globalData.userInfo) {
            username = app.globalData.userInfo.nickName;
        } else {
            return;
        }
        wx.request({
          url: app.globalData.base_url + 'task/',
          method: "POST",
          data: {
              nickName: username,
              pk: this.data.pk
          },
          success: res => {
              console.log(res);
          }
        })
    }
})