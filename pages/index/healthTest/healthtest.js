const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
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
    util.get(api.healthTest+'/list').then((res)=>{
      console.log('测试',res)
        that.setData({
          health_list:res.data.list
        })
    }).catch((errMsg)=>{
      console.log('测试',errMsg)
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
  }
})