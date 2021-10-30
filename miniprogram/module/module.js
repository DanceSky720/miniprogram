const url = require("./urls.js")

module.exports = {

  banners: banners_,
  toplist: toplist_,
  topsong: topsong_,
  topsongtype: topsongtype_,
  search: search,
  songurl: songurl_,
  comment: comment_,
  simi: simi_,
  playlist: playlist_,
  emaillogin: emaillogin_,
  account: account_,
  subcount: subcount_,
  userplaylist: userplaylist_,
  userdetail: userdetail_,
  logout: logout_,
  binding: binding_,
  zylogin: zylogin_,
  zyregister: zyregister_,
  createSonglist: zycreatelist,
  zygetsonglist: zygetsonglist,
  getavatar: getavatar_,
  updateuser: updateuser_,
  
  deletesonglist: deletesonglist_,
}


function banners_() {
  return call(url.banners);
}

function toplist_() {
  return call(url.toplist)
}

function topsong_() {
  return call(url.topsong)
}

function topsongtype_(type) {
  return call(url.topsongtype + type)
}

function search(url_) {
  return call(url.search + url_);
}

function songurl_(id_) {
  return call(url.songurl + id_);
}

function comment_(id) {
  return call(url.comment + id)
}

function simi_(id) {
  return call(url.simi + id)
}

function playlist_(id) {
  return call(url.playlist + id)
}

function emaillogin_(email, password) {
  return call(url.emaillogin + `${email}+&password=${password}`)
}

function account_() {
  return call(url.account)
}

function subcount_() {
  return call(url.subcount)
}

function userplaylist_(id) {
  return call(url.userplaylist + id)
}

function userdetail_(id) {
  return call(url.userdetail + id)
}

function logout_() {
  return call(url.logout)
}

function binding_(id) {
  return call(url.binding + id)
}

function zylogin_(email, password) {
  return call(url.zylogin + `?email=${email}&password=${password}`)
}

function zyregister_(email, password, name) {
  return call(url.zyregister + `?email=${email}&password=${password}&name=${name}`)
}

function zycreatelist(title, uid, details) {
  return call(url.createsonglist + `?title=${title}&uid=${uid}&details=${details}`)
}

function zygetsonglist(uid) {
  return call(url.getsonglist + `?uid=${uid}`)
}

function getavatar_() {
  return call(url.getavatar)
}

function updateuser_(name, email, password, avatar, uid) {
  return call(url.updateuser + `?name=${name}&email=${email}&password=${password}&avatar=${avatar}&uid=${uid}&`)
}
function deletesonglist_(uid,cid) {
  return call(url.deletesonglist+`?uid=${uid}&cid=${cid}`)
}

export const call = (url_) => {
  wx.showLoading({
    title: '请稍等片刻!',
    mask: false
  })

  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "http",
      data: {
        url: url_
      },
      success: (result) => {
        resolve(result);

      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {

        wx.hideLoading()
      }



    })
  })


}