const app = getApp()
<<<<<<< HEAD
Page({

  /**
   * 页面的初始数据
   */
=======
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
Page({
>>>>>>> master
  data: {
    article:null,
    listname: [],
    listone: [],
    ishidden: 0,
    categoryList:null,
    titleid:2,
    num:1,
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  tz:function(e){
    var info = JSON.stringify(e.target.dataset.info)
    console.log(info)
    wx.navigateTo({
      url: '../dedail/dedail?info=' + info,
    })
  },
  showTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that=this
    // 获取标签元素上自定义的 data-myindex 属性的值
    let myindex = e.currentTarget.dataset.myindex;
    console.log(myindex);
    that.setData({
      ishidden: myindex,
      titleid: e.currentTarget.dataset.id
    })
<<<<<<< HEAD
    wx.request({
      url: app.globalData.urlPath3 +'/home/article/category',
      data: {
          pageNum:that.data.num,
          pageSize:6,
          categoryId: e.currentTarget.dataset.id
      },
      method:'post',
      success(res) {
        console.log(res)
        that.setData({
          article: res.data.list,
        })
      }
    })
=======
    util.post(
      api.realTimeInfo+'/article/category',
      {
          pageNum:that.data.num,
          pageSize:6,
          categoryId: e.currentTarget.dataset.id
      }).then((res)=>{
        that.setData({
          article: res.data.list,
        })
      }).catch((errMsg)=>{

      })
>>>>>>> master
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      wx.request({
        url: app.globalData.urlPath3+'/home/article/category/list',
        data:{},
        success(res){
            console.log(res)
            that.setData({
              article:res.data.result.article,
              categoryList: res.data.result.categoryList
            })
        }   
      })
  },
<<<<<<< HEAD
 
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
=======
>>>>>>> master
  onReachBottom: function () {
    var that=this
      wx.showToast({
        title: '加载中',
        icon:'loading',
        duration: 500,
        success: function () { 
          console.log(that.data.categoryId)
            wx.request({
              url: app.globalData.urlPath3 + '/home/article/category',
              data: {
                pageNum: that.data.num++,
                pageSize: 6,
                categoryId: that.data.titleid
              },
              method: 'post',
              success(res){
                console.log(res)
                if(!res.data.list.length){
                    wx.showToast({
                      title: '没有更多数据啦',
                      icon:'loading'
                    })
                }else{
                    that.setData({
                      article: that.data.article.concat(res.data.list),
                      // categoryList: res.data.result.categoryList
                    })
                }
              }
            })
        },
      })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let id = res.target.dataset.info.id;
    var info = JSON.stringify(res.target.dataset.info)
    console.log(res.target.dataset.info)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log(id)
    }
    return {
      title: res.target.dataset.info.title,
      path: '/pages/index/dedail/dedail?info=' + info,
      imageUrl: res.target.dataset.info.coverUrl
    }
  }
})