const mask_hide = "mask_hide"
const mask_show = "mask_show"
const popup_show = "popup_show"
const popup_hide = "popup_hide"
Component({
  properties: {
    ctext: {
      type: String,
      value: '取消',
    },
    rtext: {
      type: String,
      value: '好的'
    },
    btn: {
      type: String,
      value: 1
    },
    ctc: {
      type: String,
      value: 1
    },
    title: {
      type: String,
      value: 0
    },

    content: {
      type: String,
      value: 0
    },

  },


  options: {
    multipleSlots: true
  },

  data: {
    show: false,
    maskState: "",
    popupState: "",
  },


  methods: {
    show() {
      this.setData({
        show: true,
        maskState: mask_show,
        popupState: popup_show,
      })
    },
    close() {
      this.setData({
        maskState: mask_hide,
        popupState: popup_hide
      })
      setTimeout(() => {
        this.setData({
          show: false
        })
      }, 100);
      this.triggerEvent('closeEvent')
    },
    clickToClose() {
      if (this.properties.ctc == 1) {
        this.close()
      }
    },
    continue () {
      this.triggerEvent('continueEvent')
      this.close()
    }
  }


})