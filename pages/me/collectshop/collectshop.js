const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
const app = getApp()
Page({
  data: {
      collectList:null,
      x: 0, // 注意，这里通过x属性设置的宽度的单位是px
      delList: [],
      statusBarHeight: app.globalData.statusBarHeight
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  touchStart: function (e) {
    console.log(e, e.touches[0].clientX)
    this.setData({
      s_x: e.touches[0].clientX,
      curr: e.currentTarget.dataset.id
    })
  },
  touchEnd: function (e) {
    console.log(e, e.changedTouches[0].clientX)
    var e_x = e.changedTouches[0].clientX
    if (this.data.s_x - e_x > 20) {
      console.log("向左滑")
      this.setData({
        x: -120
      })
    } else {
      this.setData({
        x: 0
      })
    }
  },
  // 删除按钮
  del: function (e) {
    var _this = this, id = e.currentTarget.dataset.delID
    this.data.delList.splice(id, 1)
    this.setData({
      delList: this.data.delList,
      curr: 0
    })
    console.log(e.currentTarget.dataset.delid)
    var goodsid = e.currentTarget.dataset.delid
    util.post(
      api.urlPath1+'/app/goods/favorite',
      {
        'sid': wx.getStorageSync("sid"),
        goodsId:goodsid
      }
      ).then((res)=>{
        console.log(res,'删除商品收藏')
      }).catch((errMsg)=>{
        console.log(errMsg,'删除商品收藏')
      })
  },
  onShow: function () {
    var that = this
    if (wx.getStorageSync("token")){
      util.get(api.favorite).then((res)=>{
        if(res.data.status !== 200){
        }else{
          that.setData({
            delList: res.data.result,
          })
        }
      }).catch((errMsg)=>{
        console.log(errMsg,'收藏')
      })
    }else{
      wx.showModal({
        title: '请您先登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})