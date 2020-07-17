// pages/admin/admin.js
const app = getApp();
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        show: false,
        myTask: []
    },
    onLoad: function() {
        wx.request({
          url: app.globalData.base_url + 'sign/',
          method: "GET",
          data: {
              username: app.globalData.user
          },
          success: (res) => {
              if (res.statusCode === 200) {
                  this.setData({
                      myTask: JSON.parse(res.data.tasks)
                  })                  
              }
              
          }
        })
    },
    addSign: function() {
        this.setData({
            show: true
        })
    },
    addSignFinish() {

        wx.request({
          url: app.globalData.base_url + 'sign/',
          method: "POST",
          dataType: "json",
          data: {
              title: this.data.title,
              username: app.globalData.user
          },
          success: function(res) {
              if (res.statusCode === 200) {
                  Toast.success(res.data.message);
                  wx.redirectTo({
                    url: '/pages/admin/admin',
                  })
              } else {
                Toast.fail(res.data.message);
              }
          }
        })
    },
    titke_change: function(e) {
        this.setData({
            title: e.detail
        })
    },
    remove: function() {
        this.setData({
            show: false
        })
    }
})