
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
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
    wx.request({
      url: app.globalData.urlPath1 + '/app/goods?categoryIdList=' + "[" + e.currentTarget.dataset.id + "]" + '&pageSize=10&pageNum=0',
      data: {},
      success(res) {
       
        that.setData({
         
          result: res.data.result
        })
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    console.log(options.id)
      var that=this
      wx.setNavigationBarTitle({
        title: options.name,
      })
      wx.request({
        url:  app.globalData.urlPath1 + '/app/goods?categoryIdList=' + "["+options.id+"]" +'&pageSize=10&pageNum=0',
        data:{},
        success(res){
          console.log(res)
          //删除医美器械
          res.data.categoryList.splice(2,1) 
          // console.log(res.data.categoryList.splice(2,1) )  //返回的是删除的本身
          that.setData({
            list: res.data.categoryList,
            result: res.data.result
            // title: options.name  
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})