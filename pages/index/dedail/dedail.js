var wxp = require('../../../wxParse-master/wxParse-master/wxParse/wxParse.js');
const app=getApp()
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
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
      util.get(api.urlPath3+'/home/article/'+info.id).then((res)=>{
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
            }
          })
      })
  }
})