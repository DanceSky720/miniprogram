export const cFun = (params) => {
  wx.showLoading({
    title: '请稍等片刻!',
    mask: true
  })

  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      ...params,
      success: (result) => {
        resolve(result);
        wx.hideLoading()
      },
      fail: (err) => {
        reject(err);
        wx.hideLoading()
      }
    })
  })
}