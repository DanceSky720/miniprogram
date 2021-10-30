var gd = getApp().globalData
var app = getApp()
const Module = require("../../module/module.js")
var name = ""
var old_password = ""
var password1 = ""
var password2 = ""
var email = ""

Page({


  data: {
    userinfo: {},
    avatars: [],
    avatar: ''
  },


  onLoad: function (options) {
    this.popup_avatar = this.selectComponent("#popup_avatar")
    Module.getavatar().then(res => {
      this.setData({
        avatars: res.result
      })
    })
    this.setData({
      userinfo: gd.userinfo,
      avatar: gd.userinfo.avatar
    })
  },


  selectAvatar() {
    this.popup_avatar.show()
  },

  itemClick(e) {
    let {
      avatar
    } = e.currentTarget.dataset
    this.setData({
      avatar: avatar
    })
  },


  sumbit() {

    if (password1 != "" && password2 != "" && old_password != this.data.userinfo.password) {
      wx.showToast({
        title: '旧密码有误',
        icon: "error"
      })
    } else {
      if (name == "") {
        name = this.data.userinfo.name
      }
      if (email == "") {
        email = this.data.userinfo.email
      }
      if (password2 == "") {
        password2 = this.data.userinfo.password
      }

      Module.updateuser(name, email, password2, this.data.avatar, this.data.userinfo.uid).then(res => {

        wx.showToast({
          title: res.result.state,
        })
        if (res.result.state == '更改成功') {
          gd.changed = true
          setTimeout(() => {
            wx.navigateBack()
          }, 500)
        }

      })
    }

  },

  inputChange(e) {
    let {
      type
    } = e.currentTarget.dataset
    let value = e.detail.value.replace(/\s+/g, "")
    switch (type) {
      case "email":
        email = value
        break;
      case "old_password":
        old_password = value
        break;

      case "password1":
        password1 = value
        break;
      case "password2":
        password2 = value
        break;
      case "name":
        name = value
        break;

    }
  },

  back() {
    wx.navigateBack()
  }





})