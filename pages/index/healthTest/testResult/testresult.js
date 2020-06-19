const util = require('../../../../utils/util.js')
const api = require('../../../../config/api.js')
Page({
  data: {
    result_id:''
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    util.get(api.urlPath3+'/home/exam/result/'+options.id).then((res)=>{
      that.setData({
        result_text:res.data.result.title,
        result_id:res.data.result.id
      })
    }).catch((errMsg)=>{
      console.log(errMsg,'健康测试结果')
    })
  },
  onShareAppMessage: function( options ){
    console.log('/............')
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "转发的标题",    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/healthTest/testEntrance/testEntrance?id='+ this.data.result_id,    // 默认是当前页面，必须是以‘/'开头的完整路径
      success: function(res){
        console.log(res,'///////////////')
      }
    };
    // 返回shareObj
    return shareObj;
  }
})