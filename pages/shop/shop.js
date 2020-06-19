const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
Page({
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
    // 先拉在自动获取数据  每次10条
    util.get(api.urlPath1+'/app/goods/home/recommend'+'?pageNum='+that.data.pagenum).then((res)=>{
      var arr1 = that.data.datalist; //从data获取当前datalist数组
        var arr2 = res.data.result; //从此次请求返回的数据中获取新数组
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          datalist: arr1 //合并后更新datalist
        })
    }).catch((errMsg)=>{
      console.log(errMsg,'错误信息')
    })
  },
  smartWear:function(e){
    // console.log(e.currentTarget.dataset.id)
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
    //此处为使用封装的post请求
    util.get(api.urlPath1+'/app/goods/home').then((res) => {
      // console.log(res,'封装的')
      that.setData({
        newArrival: res.data.result.newArrival,
        slideList: res.data.result.slideList,
        foru: res.data.result.recommendResultList,
        fatherCategoryIdList: res.data.result.fatherCategoryIdList,
        allCategoryInfo: res.data.result.allCategoryInfo
      })
    }).catch((errMsg) => {
      //错误提示信息
     console.log(errMsg,'错误信息')
    })

    util.get(api.urlPath1+'/app/goods?pageNum='+that.data.pagenum).then((res)=>{
      // console.log(res,'商城列表')
      that.setData({
        datalist:res.data.result
      })
    }).catch((errMsg)=>{
      console.log(errMsg,'商城错误errMsg')
    })
    ////////////这是商城首页推荐数据请求结束////////////////////////////
  },
  tz(e){
    var that = this
    util.get(api.urlPath1+'/app/goods/'+ e.currentTarget.dataset.id).then((res)=>{
      console.log(res,'是否收藏')
      that.setData({
        isFavorite:res.data.result.isFavorite
      })
      var is_like = {
        id: e.currentTarget.dataset.id,
        isFavorite:that.data.isFavorite
      }
      wx.navigateTo({
        url: "../product/product?id=" +JSON.stringify(is_like)
      })
    }).catch((errMsg)=>{
      console.log(errMsg,'收藏errMsg')
    })
  },
  allClass:function(){
    wx.navigateTo({
      url: '../allClass/allClass',
    })
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
  }
})