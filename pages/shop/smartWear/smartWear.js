
const app = getApp()
const util = require('../../../utils/util')
const api = require('../../../config/api')
Page({
  data: {
    list: null,
    ishidden: 0,
    result:null,
    id:8,
    categoryList:null,
    statusBarHeight: app.globalData.statusBarHeight
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../product/product?id=" + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  select: function (e) {
    var that=this
    // 获取标签元素上自定义的 data-myindex 属性的值
    let myindex = e.currentTarget.dataset.myindex;
    
    that.setData({
      ishidden: myindex,
      id: e.currentTarget.dataset.id
    })
     util.get(api.urlPath1+ '/app/goods?categoryIdList=' + "[" + e.currentTarget.dataset.id + "]" + '&pageSize=10&pageNum=0').then((res)=>{
        that.setData({
          result: res.data.result
        })
      })
  },
  onLoad: function (options) {
    console.log(options.id)
      var that=this
      wx.setNavigationBarTitle({
        title: options.name,
      })
      util.get(api.urlPath1+ '/app/goods?categoryIdList=' + "["+options.id+"]" +'&pageSize=10&pageNum=0').then((res)=>{
        //删除医美器械
        res.data.categoryList.splice(2,1) 
        // console.log(res.data.categoryList.splice(2,1) )  //返回的是删除的本身
        that.setData({
          list: res.data.categoryList,
          result: res.data.result
          // title: options.name  
        })
      })
  }
})