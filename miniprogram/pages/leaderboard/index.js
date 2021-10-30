const gd = getApp().globalData
const Module = require("../../module/module.js")
const player = require("../../tool/player.js")

Page({

  data: {
    toplist: [],
    alive: 0,
    details: {},

  },





  onLoad: function (op) {
    let {
      index
    } = op
    this.setData({
      alive: index
    })
    this.popup_info = this.selectComponent("#info");
    let list = []
    for (let i = 0; i < gd.toplist.length; i++) {
      gd.toplist[i].alive = false
      list[i] = gd.toplist[i]
    }
    list[index].alive = true
    this.setData({
      toplist: list
    })

    this.getPlaylist(list[index].id)

  },


  rankItemClick(e) {
    let {
      id,
      index
    } = e.currentTarget.dataset
    let list = this.data.toplist

    if (index != this.data.alive) {
      list[this.data.alive].alive = false
      list[index].alive = true
      this.setData({
        toplist: list,
        alive: index
      })
    }

    this.getPlaylist(id)

  },


  getPlaylist(id) {
    Module.playlist(id).then(res => {
      
      let details_ = res.result.playlist
      details_.updateTime = "\n" + ft(details_.updateTime) + "/" + this.data.toplist[this.data.alive].updateFrequency
      this.setData({
        details: details_
      })
    })

  },


  listItemClick(e) {
    let {
      index
    } = e.currentTarget.dataset
    let song = this.data.details.tracks[index]

    player.playSong(song.name, song.id, song.al.picUrl, song.ar, true)

  },

  showInfo() {
    this.popup_info.show()
  },



})




function convert24(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}

function ft(time) {
  var dd = new Date(time);
  return convert24(dd.getMonth()) +
    "-" + convert24(dd.getDate())
}