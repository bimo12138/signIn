// pages/login/login.js
const app = getApp();
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: ""
    },
    onLoad: function() {
        let status = app.globalData.login;
        if (status) {
            wx.redirectTo({
              url: '/pages/admin/admin',
            })
        }
    },
    field_input: function(e) {
        const field = e.currentTarget.id;
        this.setData({
            [`${field}`]: e.detail
        })
    },
    get_csrf: function(cookies) {
        let result = "";
        cookies.forEach(cookie => {
            var num = cookie.split(";");
            num.forEach(element => {
                var value = element.split("=");            
                if (value[0] === "csrftoken") {
                    result = value[1];
                    return result;
                }
            })  
        })
        return result;
    },
    login: function() {
        let username = this.data.username;
        let password = this.data.password;
        if (username && password) {
            wx.request({
                url: app.globalData.base_url + 'login',
                data: {
                    username,
                    password
                },
                success: (res) => {
                    console.log(res);
                    if (res.statusCode === 200) {
                      let csrftoken = this.get_csrf(res.cookies);
                      app.globalData.csrftoken = csrftoken;
                      app.globalData.login = true;
                      app.globalData.user = username;
                      wx.redirectTo({
                        url: '/pages/admin/admin',
                      })
                    } else {
                      Toast.fail(res.data.message);
                    }
                }
              })
        } else {
            Toast.fail("用户名或密码为空！");
        }
        
    }
})