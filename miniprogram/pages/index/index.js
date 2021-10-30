const gd = getApp().globalData

const Module = require("../../module/module.js");

const player = require("../../tool/player.js")
Page({
  data: {
    banners: [],
    toplist: [],
    topsong: [],
    ready: false,
    song: {},
    playing: false,
  },

  async onLoad(params) {

    await Module.banners().then(res => {
      this.setData({
        banners: res.result.banners
      })
    });

    await Module.toplist().then(res => {
      this.setData({
        toplist: res.result.list,
      })
      gd.toplist = res.result.list
    });

    await Module.topsong().then(res => {
      this.setData({
        topsong: res.result.data,
        ready: true,
        playing:false
      })
      gd.topsong = res.result.data
    })

  },

  onShow: function (params) {
    this.setData({
      song: player.getSong(),
      playing: player.isPlaying()
    })
  },

  topsongItemClick(e) {
    let {
      index
    } = e.currentTarget.dataset

    let song = this.data.topsong[index]
    player.playSong(song.name, song.id, song.album.blurPicUrl, song.artists, true)
  },

  toLeaderboard(e) {
    let index = e.currentTarget.dataset.index
    if (index == undefined || index == null) {
      index = 0
    }
    wx.navigateTo({
      url: '/pages/leaderboard/index?index=' + index,
    })

  },

  toMusic() {
    if (this.data.song.picUrl != null) {
      wx.navigateTo({
        url: '/pages/music/index',
      })
    } else {
      wx.showToast({
        title: '请选择音乐',
        icon: "none"
      })
    }

  },
  play() {
    if (this.data.song.picUrl != null) {
      player.play()
      this.setData({
        playing: !player.isPlaying()
      })
    } else {
      wx.showToast({
        title: '请选择音乐',
        icon: "none"
      })
    }

  },











})