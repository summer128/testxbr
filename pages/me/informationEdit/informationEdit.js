const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday:false,
    nickname:'',
    avatarurl:'',
    birthday_date:'',
    select_sex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('informationedit',options)
    var that = this
    that.setData({
      phoneNumber : wx.getStorageSync('phoneNumber'),
      nickname: wx.getStorageSync('userInfo').nickName,
      avatarurl: wx.getStorageSync('userInfo').avatarUrl
    })
    

  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindDateChange: function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      birthday_date: e.detail.value,
      birthday:true
    })
  },
  // 监听昵称input的变化
  nicknameChange(e){
    console.log('nicknameChange',e)
    console.log('nicknameChange',e.detail.value)
    this.setData({
      nickname:e.detail.value
    })
    console.log(this.data.nickname)
  },
  // radioChange
  radioChange(e){
    console.log('radioChange',e.detail.value)
    this.setData({
      select_sex:e.detail.value
    })
  },
  // 确认保存
  sure_save(){
    var that = this
    wx.request({
      url: app.globalData.urlPath1 + '/app/users/profile',
      method: 'put',
      header: {
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      data:{
        "nickName": that.data.nickname,
        "gender": that.data.select_sex,
        "birthday": that.data.birthday_date,
      },
      success(res) {
        console.log(res)
        console.log(that.data.birthday_date)
        var behind_name = res.data.result.nickName
        var local_story = wx.getStorageSync('userInfo').nickName
        wx.setStorageSync(local_story,behind_name)
      }
    })
  }
})