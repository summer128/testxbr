const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
const app = getApp()
Page({
  data: {
      x: 0, // 注意，这里通过x属性设置的宽度的单位是px
      delList: [],
      statusBarHeight: app.globalData.statusBarHeight,
      displays:'none',
      pro_display:'block'
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
    var goodsid = e.currentTarget.dataset.delid
    util.post(
      api.urlPath1+'/app/goods/favorite',
      {
        'sid': wx.getStorageSync("sid"),
          goodsId:goodsid
      }
      ).then((res)=>{
        console.log(res,'删除收藏列表')
        this.onShow()
    })
    
  },
  tz(e) {
    console.log(e)
   wx.navigateTo({
      url: "../../product/product?id=" + e.currentTarget.dataset.id
    })
  },
  onShow: function () {
    var that = this
    util.get(api.favorite).then((res)=>{
      console.log('收藏123',res)
      let pro_list = res.data.result
      if(pro_list.length <= 0){
        that.setData({
          displays: 'block',
          pro_display:'none'
        })
      }else{
        that.setData({
          delList: pro_list,
          displays: 'none',
          pro_display:'block'
        })
      }
       
    }).catch((errMsg)=>{
      console.log(errMsg,'收藏')
    })


    // if (wx.getStorageSync("token")){
    //   util.get(api.favorite).then((res)=>{
    //     console.log('收藏123',res)
    //       that.setData({
    //         delList: res.data.result,
    //       })
    //   }).catch((errMsg)=>{
    //     console.log(errMsg,'收藏')
    //   })
    // }else{
    //   wx.showModal({
    //     title: '请您先登录',
    //     success(res) {
    //       if (res.confirm) {
    //         wx.switchTab({
    //           url: '../me'
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    util.get(api.urlPath1 + '/app/goods/recommend').then((res)=>{
      that.setData({
        forucontent: res.data.result
      })
    })
  }
})