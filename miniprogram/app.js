//app.js


const player = require("./tool/player.js")
App({

  globalData: {
    toplist: [],
    logined: false,
    playlist: [],
    topsong: [],
    userinfo: {},
    changed: false
  },
  onLaunch: function () {

    player.setAudio(wx.getBackgroundAudioManager())

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-1gah1dx6b1a96088',
        traceUser: true,
      })
    }

    wx.getSystemInfo({
      success: res => {
        this.system = res
      }
    })
    this.menu = wx.getMenuButtonBoundingClientRect()



  }
})