function toast(title, success) {
  let icon
  if (success) {
    icon = "success"
  } else {
    icon = "error"
  }
  wx.showToast({
    title: title,
    icon: icon
  })
}




module.exports={
  toast
}
