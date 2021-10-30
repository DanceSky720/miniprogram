Component({
  properties: {
    placeholder: {
      type: String,
      value: '',
    }
  },
  data: {
    inputValue: ''
  },
  methods: {
    // 用户输入触发
    handleInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
      this.triggerEvent('inputChange', this.data.inputValue)
    },
    // 点击清空输入框icon
    handleDeleteClick: function () {
      this.setData({
        inputValue: ''
      })
    },
    // 点击确定触发
    handleConfirm() {
      this.triggerEvent('handleConfirm', this.data.inputValue)
    },

  }
})