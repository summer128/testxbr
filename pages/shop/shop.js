
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listtitle: ["全部分类", "智能穿戴", "生活护理", "医美塑形", "滋补养生"],
    newArrival:null,     //每日上新
    slideList:null,
    forucontent:null,
    foru:null,
    fatherCategoryIdList:null,
    allCategoryInfo:null,
    datalist: [], //.wxml文件需要绑定的列表，我这里用的数据类型是数组
    pagenum: 1, //初始页默认值为1
    statusBarHeight: app.globalData.statusBarHeight,
    isFavorite:false
  },
  //////////////////////////////////////////////////////////////////////////////////////////////
  getdatalist: function () { //可在onLoad中设置为进入页面默认加载
    var that = this;
    wx.request({
      url: app.globalData.urlPath1 + '/app/goods/home/recommend?pageNum=' + that.data.pagenum,
      success: function (res) {
        console.log(res)
        var arr1 = that.data.datalist; //从data获取当前datalist数组
        var arr2 = res.data.result; //从此次请求返回的数据中获取新数组
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          datalist: arr1 //合并后更新datalist
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  smartWear:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: 'smartWear/smartWear?name='+e.currentTarget.dataset.name+'&id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ////////////这是商城首页数据请求开始////////////////////////////
    var that=this
    wx.request({
      url: app.globalData.urlPath1+'/app/goods/home',
      data:{},
      success(res){
        console.log(res)
        console.log('-------------------------------------------')
        console.log(res.data.result.newArrival)
        that.setData({
          newArrival: res.data.result.newArrival,
          slideList: res.data.result.slideList,
          foru: res.data.result.recommendResultList,
          fatherCategoryIdList: res.data.result.fatherCategoryIdList,
          allCategoryInfo: res.data.result.allCategoryInfo
        })
      }
    })
    ////////////这是商城首页数据请求结束//////////////////////////// 
    ////////////这是商城首页推荐数据请求开始////////////////////////////
    
    wx.request({
      url: app.globalData.urlPath1 +'/app/goods/home/recommend?pageNum='+that.data.pagenum,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          datalist:res.data.result
        })
      }
    })
    ////////////这是商城首页推荐数据请求结束////////////////////////////

  },
  tz(e){
    
    var that = this
     wx.request({
        url: app.globalData.urlPath1 + `/app/goods/${e.currentTarget.dataset.id}`,
        method: 'get',
        header: {
          'content-type': "application/x-www-form-urlencoded",
          'token': wx.getStorageSync("token"),
          'authorization': wx.getStorageSync("sid")
        },
        success(res) {
          // console.log('收藏11111111111',res)
          console.log('收藏isFavorite',res.data.result.isFavorite)
          that.setData({
            isFavorite:res.data.result.isFavorite
          })
          var is_like = {
            id: e.currentTarget.dataset.id,
            isFavorite:that.data.isFavorite
          }
          // console.log(e.currentTarget.dataset.id)
          wx.navigateTo({
            url: "../product/product?id=" + JSON.stringify(is_like)
          })
        }
      })
      
  },
  allClass:function(){
    wx.navigateTo({
      url: '../allClass/allClass',
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
    var that = this;
    var pagenum = that.data.pagenum + 1;
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    that.getdatalist();//重新调用请求获取下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})