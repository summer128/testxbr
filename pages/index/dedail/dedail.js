var wxp = require('../../../wxParse-master/wxParse-master/wxParse/wxParse.js');
const app=getApp()
Page({
  data: {
    data1:null,
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../product/product?id=" + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    console.log(options,'防护手册的详情页面')
    var info = JSON.parse(unescape(options.info))
    console.log(info)
    var that=this
      console.log(info.id)
      wx.request({
        url: app.globalData.urlPath3+'/home/article/'+info.id,
        data:{},
        success(res){
          console.log(res)
          that.setData({
            data1:res.data
          })
          wx.request({
            url: res.data.document.contentUrl,
            data: {},
            success(res) {
              console.log(res)
              var htmlCode = res.data
              wxp.wxParse('htmlCode', 'html', htmlCode, that, 0);
              that.setData({
                
              })
            }
          })
        }
      })
      
  }
})