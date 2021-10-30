var gd = getApp().globalData
const Module = require("../../module/module.js");
const player = require("../../tool/player.js")
Page({


  data: {
    topsong: [],
    topsong1: [],

    size: 10,
    cindex: 0,

    typelist: [{
        id: 0,
        text: "全部",
        type: 0
      },
      {
        id: 1,
        text: "华语",
        type: 7
      },
      {
        id: 2,
        text: "欧美",
        type: 96
      },
      {
        id: 3,
        text: "韩国",
        type: 16
      },

    ]
  },


  onLoad: function (options) {
    this.setData({
      topsong: gd.topsong,
      topsong1: gd.topsong,
    })

  },


  typeChoose(e) {
    let {
      index,
      type
    } = e.currentTarget.dataset
    if (index == 0) {
      this.setData({
        topsong1: this.data.topsong
      })
    } else {
      Module.topsongtype(type).then(res => {
        this.setData({
          topsong1: res.result.data,
          cindex: 0
        })
      })
    }
  },
  change(e) {
    let {
      mun,
      to
    } = e.currentTarget.dataset
    let index_ = this.data.cindex
    if (mun > 0) {
      if (index_ < (this.data.topsong1.length / this.data.size) - 1) {
        index_++
      }
    } else {
      if (index_ > 0) {
        index_--
      }
    }
    this.setData({
      cindex: index_
    })
    if (to != undefined) {
      this.setData({
        cindex: to
      })
    }
  },


  allItemClick(e) {
    let index = e.currentTarget.dataset.index
    let song = this.data.topsong1[index]
    player.playSong(song.name, song.id, song.album.blurPicUrl, song.album.artists, true)
  },

  topItemClick(e) {
    let index = e.currentTarget.dataset.index
    let song = this.data.topsong[index]
    player.playSong(song.name, song.id, song.album.blurPicUrl, song.album.artists, true)
  },
})