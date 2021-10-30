const player = require("../../tool/player.js")
const Module = require("../../module/module.js")
Page({

  data: {
    audio: {},
    song: {},
    playing: true,
    hotComments: [],
    similar: [],
    loaded: false,
  },

  onLoad: function (options) {
    this.setData({
      audio: player
    })
  },

  play() {
    player.play()
    this.setData({
      playing: !player.isPlaying()
    })
  },


  onShow: function () {
    this.check()
  },

  async check() {
    await this.setData({
      song: player.getSong(),
    })
    wx.setNavigationBarTitle({
      title: this.data.song.title
    })

    await Module.simi(this.data.song.id).then(res => {
      this.setData({
        similar: res.result.songs
      })
    })

    await Module.comment(this.data.song.id).then(res => {
      let hotComments_ = res.result.hotComments
      for (let i = 0; i < hotComments_.length; i++) {
        hotComments_[i].time = ft(hotComments_[i].time)
      }
      this.setData({
        hotComments: hotComments_,
        loaded: true,
        playing: player.isPlaying(),
        playing: player.isPlaying(),
      })
    })

  },

  similarItemClick(e) {
    let {
      index
    } = e.currentTarget.dataset
    let song = this.data.similar[index]

    player.playSong(song.name, song.id, song.album.blurPicUrl, song.artists, false)
    this.check()
  }


})


function convert24(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}

function ft(time) {
  var dd = new Date(time);
  return dd.getFullYear() + "-" + convert24(dd.getMonth()) + "-" + convert24(dd.getDate()) + " " + convert24(dd.getHours()) + ":" + convert24(dd.getMinutes()) + ":" + convert24(dd.getSeconds());
}