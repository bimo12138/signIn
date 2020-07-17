// pages/signed/signed.js
const app = getApp();
Page({

    data: {
        signed: []
    },

    onLoad: function (options) {
        let pk = options.pk;
        wx.request({
          url: app.globalData.base_url + 'task-manager/',
          method: "GET",
          data: {
              pk
          },
          success: (res) => {
              this.setData({
                  signed: JSON.parse(res.data.logs)
              })
          }
        })
    }
})