const Module = require("../../module/module.js")
const player = require("../../tool/player.js")

Page({


  data: {
    songs: [],
  },


  onLoad: function (options) {


  },

  musicSearch(e) {
    Module.search(e.detail).then(res => {
      let songs_ = res.result.result.songs
    
      this.setData({
        songs: songs_
      })
    })
  },

  itemClick(e) {
    let {
      index
    } = e.currentTarget.dataset
    let song = this.data.songs[index]
    if (player.getSong.id == song.id && player.getSong.id != undefined) {
      wx.navigateTo({
        url: '/pages/music/index',
      })
    } else {
      player.playSong(song.al.name, song.id, song.al.picUrl, song.ar, true)
    }
  }

})