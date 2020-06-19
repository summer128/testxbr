<<<<<<< HEAD
// pages/index/healthTest/healthtest.js
=======
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
>>>>>>> master
Page({
  data: {
    health_list:[]
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
<<<<<<< HEAD
    wx.request({
      url: 'https://www.shanyide.cn/api/v3/home/exam/list',
      method: 'get',
      header: {
        'content-type': "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log('测试',res)
        that.setData({
          health_list:res.data.list
        })
        console.log('测试',res.data.list,'添加完color之后')
      }
=======
    util.get(api.healthTest+'/list').then((res)=>{
      console.log('测试',res)
        that.setData({
          health_list:res.data.list
        })
    }).catch((errMsg)=>{
      console.log('测试',errMsg)
>>>>>>> master
    })
  },
  // 测试入口
  test_entrance(e){
    console.log(e)
    console.log(e.currentTarget.dataset.test_id,e.currentTarget.dataset.value2,'测试rukou')
    var entrance_message = {
      test_id:e.currentTarget.dataset.test_id,
      test_title:e.currentTarget.dataset.value2
    }
    wx.navigateTo({
      url: 'testEntrance/testEntrance?test_infom='+ JSON.stringify(entrance_message),
    })
<<<<<<< HEAD
    
  },
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

=======
>>>>>>> master
  }
})