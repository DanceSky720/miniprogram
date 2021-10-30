module.exports = {

  banners: un("/banner"), //横幅
  toplist: un("/toplist/detail"), //排行榜
  topsong: un("/top/song"), //新歌all
  topsongtype: un("/top/song?type="), //新歌type

  searchdefault: un("/search/default"), //默认搜索关键词
  search: un("/cloudsearch?keywords="), //搜索
  songurl: un("/song/url?id="), //获取音乐 url
  comment: un("/comment/music?id="), //歌曲评论
  simi: un("/simi/song?id="), //获取相似音乐
  playlist: un("/playlist/detail?id="), //获取歌单详情
  emaillogin: un("/login?email="), //邮箱登录
  account: un("/user/account"), //获取账号信息
  userdetail: un("/user/detail?uid="), //获取用户详情
  subcount: un("/user/subcount"), //获取用户信息 , 歌单，收藏，mv, dj 数量
  userplaylist: un("/user/playlist?uid="), // 获取用户歌单
  logout: un("/logout"), // 退出登录
  binding: un("/user/binding?uid="), // 获取用户绑定信息
  zylogin:zy("/login"),
  zyregister:zy("/register"),
  createsonglist:zy("/createsonglist"),
  getsonglist:zy("/getsonglist"),
  getavatar:zy("/getavatar"),
  updateuser:zy("/updateuser"),
  deletesonglist:zy("/deletesonglist"),

}


function un(url) {
  const base = "http://cloud-music.pl-fe.cn"
  return base + url
}

function zy(url) {
  const base = "http://37104q568t.qicp.vip"
  return base + url
}