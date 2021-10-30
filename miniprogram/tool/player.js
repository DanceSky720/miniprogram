const Module = require("../module/module.js")
const ft = require("../tool/ft.js")
const cycle = "cycle";
const random = "random";
const singlecycle = "singlecycle";

var player = {
  setAudio: setAudio,
  audio: {},
  play: play,
  mode: cycle,
  list: [],
  next: next,
  pre: pre,
  listenerPreparation: listenerPreparation,
  modeChange: modeChange,
  song: {},
  index: 0,
  getSong: getSong,
  isPlaying: isPlaying,
  playSong: playSong,
  playSongHs: playSongHs,

}





function setAudio(audio_) {
  player.audio = audio_
  listenerPreparation()
}


function getSong() {

  return player.song

}

function isPlaying() {
  return !player.audio.paused
}


function play() {
  if (player.audio.paused) {
    player.audio.play()
  } else {
    player.audio.pause()
  }
  return player.audio.paused
}


function next() {

}

function pre() {

}

function modeChange() {

}

function playSong(title, id, picUrl, singers, go) {
  let song_ = {
    title: title,
    id: id,
    picUrl: picUrl,
    singer: "",
    url: ""
  }
  let singer_ = song_.singer

  for (let i = 0; i < singers.length; i++) {
    singer_ += singers[i].name
    if (i < singers.length - 1) {
      singer_ += " / "
    }
  }
  song_.singer = singer_
  player.song = song_

  player.audio.title = song_.title
  player.audio.singer = singer_
  player.audio.coverImgUrl = song_.picUrl



    Module.songurl(id).then(res => {
      song_.url = res.result.data[0].url
      player.audio.src = song_.url
      player.song = song_

      if (go) {
        wx.navigateTo({
          url: '/pages/music/index',
        })
      }
    })


  


  

}

function playSongHs(title, url, id, picUrl, singer, go) {
  let song_ = {
    title: title,
    id: id,
    picUrl: picUrl,
    singer: singer,
    url: url
  }



  player.song = song_

  player.audio.title = song_.title
  player.audio.singer = song_.singer
  player.audio.coverImgUrl = song_.picUrl
  player.audio.src = song_.url

  if (go) {
    wx.navigateTo({
      url: '/pages/music/index',
    })
  }


}





function listenerPreparation() {
  player.audio.onCanplay(audioOnCanplay)
  player.audio.onError(audioOnError)
  player.audio.onEnded(audioOnEnded)
  player.audio.onWaiting(audioOnWaiting)

  player.audio.onNext(() => {
    next()
  })
  player.audio.onPrev(() => {
    pre()
  })
}

function audioOnError(e) {
  wx.showToast({
    title: '发生了一些错误',
  })
}

function audioOnEnded() {
  next()
}

function audioOnCanplay() {
  wx.hideLoading()
  // let list=player.playlist;
  let list = getApp().globalData.playlist;
  player.song.time = ft(new Date())
  list.push(player.song)
}

function audioOnWaiting() {
  wx.showLoading({
    title: '请稍等片刻!'
  })

}



module.exports = player