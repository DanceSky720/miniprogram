  var gd = getApp().globalData
  var app = getApp()

  const Module = require("../../module/module.js")
  const util = require("../../tool/util.js")

  var email = ""
  var password = ""
  var r_email = ""
  var r_password1 = ""
  var r_password2 = ""
  var name = ""
  var r_name = ""
  var details = ""
  var title = ""
  Page({

    data: {
      s: app.system.statusBarHeight, //状态栏高度
      n: (app.menu.top - app.system.statusBarHeight) * 2 + app.menu.height, //导航栏高度
      userinfo: {},
      zyuserinfo: {},
      logined: false,
      wylogin: false,
      zylogin: false,
      playlist: [],
      songlist_: {},
      listsetting: [{
          id: 0,
          action: "删除"
        }, {
          id: 1,
          action: "更新"
        }

      ],
      loginWay: [{
          id: 0,
          icon: "icon-loginwey",
          action: "",
          text: "自由账号登录(如果可行)",
          color: "#0080FF"
        },
        {
          id: 1,
          icon: "icon-wyy",
          action: "wyyLogin",
          text: "网易邮箱登录(常常可行)",
          color: "red"
        },
      ],
    },


    onLoad: function (options) {
      this.pupop_login = this.selectComponent("#login")
      this.pupop_login_wyy = this.selectComponent("#login_wyy")
      this.pupop_login_zy = this.selectComponent("#login_zy")
      this.pupop_about = this.selectComponent("#about")
      this.pupop_register = this.selectComponent("#register")
      this.pupop_createlist = this.selectComponent("#createlist")
      this.list_setting = this.selectComponent("#list_setting")
      this.setData({
        logined: gd.logined
      })
    },

    onShow: function (options) {
      if (gd.changed) {
        this.logout()
        gd.changed = false
      }

    },


    loginBtnClick() {
      this.pupop_login.show()
    },

    toLogin(e) {
      let {
        index
      } = e.currentTarget.dataset
      switch (index) {
        case 0:
          this.pupop_login_zy.show()
          break;
        case 1:
          this.pupop_login_wyy.show()
          break;
      }
    },

    loginContinueEvent(e) {
      Module.emaillogin(email.replace(/\s+/g, ""), password.replace(/\s+/g, "")).then(res => {
        if (res.result.code == 200) {
          this.emailLoginSucess(res)
        } else {
          util.toast(res.result.message, false)

        }
      })

    },

    async emailLoginSucess(res) {

      gd.logined = true
      this.setData({
        logined: true,
        wylogin: true,
        userinfo: res.result.profile
      })
      util.toast("登录成功", true)
      await Module.userplaylist(this.data.userinfo.userId).then(res => {
        this.setData({
          playlist: res.result.playlist
        })
      })

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
        case "password":
          password = value
          break;

        case "r_email":
          r_email = value
          break;
        case "r_password1":
          r_password1 = value
          break;
        case "r_password2":
          r_password2 = value
          break;
        case "name":
          name = value
          break;

        case "title":
          title = value
          break;
        case "details":
          details = value
          break;
        case "r_name":
          r_name = value
          break;
      }
    },

    logout() {
      setTimeout(() => {
        wx.hideLoading()
      }, 500)
      wx.showLoading({
        title: '请稍等片刻',
      })
      gd.logined = false
      this.setData({
        logined: false,
        wylogin: false,
        zylogin: false
      })
    },

    about() {
      this.pupop_about.show()
    },

    zylogin() {
      if (email == "" || password == "") {
        util.toast("请填写数据!", false)
      } else {
        Module.zylogin(email, password).then(res => {
          if (res.result.state == "ok") {
            gd.logined = true
            gd.userinfo = res.result

            this.setData({
              logined: true,
              zylogin: true,
              zyuserinfo: res.result
            })
            util.toast(res.result.state, true)

            this.getzySonglist()
          } else {
            util.toast(res.result.state, false)

          }
        })
      }


    },
    toRegister() {
      this.pupop_register.show()
      this.pupop_login_zy.close()
    },

    registerin() {

      const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      //调用正则验证test()函数
      const emailok = reg.test(r_email);
      if (r_password1 != r_password2) {
        util.toast('两次密码不相同', false)
      } else if (r_password1 == "" ||
        r_password2 == "" ||
        r_email == "" || r_name == "") {
        util.toast('填写完整数据', false)
      } else if (!emailok) {
        util.toast('错误的邮箱', false)
      } else {
        Module.zyregister(r_email, r_password2, r_name).then(res => {
          util.toast(res.result.state, true)
        })
      }
    },
    getzySonglist() {
      Module.zygetsonglist(this.data.zyuserinfo.uid).then(res => {
        this.setData({
          playlist: res.result
        })
      })
    },

    createSonglist() {
      this.pupop_createlist.show()
    },

    toCreateList() {
      if (title != "" && details != "") {
        Module.createSonglist(title, this.data.zyuserinfo.uid, details).then(res => {
          util.toast(res.result.state, true)
          this.getzySonglist()
        })
      } else {
        util.toast("请填写完整信息", false)
      }
    },

    playlistInfo() {
      util.toast("长按歌单进行操作", false)
    },
    listSetting(e) {
      this.setData({
        songlist_: this.data.playlist[e.currentTarget.dataset.index]
      })
      this.list_setting.show()
    },
    settingItemClick(e) {
      let {
        index
      } = e.currentTarget.dataset

      switch (index) {
        case 0:
          wx.showModal({
            title: "删除歌单?",
            cancelText: "不了",
            confirmText: "是的",

          }).then(res => {
            if (res.confirm == true) {
              Module.deletesonglist(this.data.zyuserinfo.uid, this.data.playlist[index].cid).then(res => {
                if (res.result.state == "删除成功") {
                  util.toast(res.result.state, true)
                  this.getzySonglist()
                } else {
                  util.toast(res.result.state, false)
                }
              })
            }

          })

          break;
        case 1:
          util.toast("稍后更新", false)
          break;
      }
    },


    listItemClick1() {
      util.toast("稍后更新", false)
    },






  })