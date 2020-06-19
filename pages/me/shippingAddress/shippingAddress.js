
const app = getApp()
const util = require('../../../utils/util')
const api = require('../../../config/api')
Page({
  data: {
    data: {
      dzlist:[],
      dz:true,
      id:{
      },
    },
  },
  site_new:function(){
    wx.navigateTo({
      url: '../site/site',
    })
  },
  edit:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      // url: '../site/site?id=' + e.currentTarget.dataset.id.id + "&receiver=" + e.currentTarget.dataset.id.receiver + '&phone=' + e.currentTarget.dataset.id.phone + '&region=' + e.currentTarget.dataset.id.region + '&detail=' + e.currentTarget.dataset.id.detail + '&isDefault=' + e.currentTarget.dataset.id.isDefault,
      url: '../site/site?click_list='+JSON.stringify(e.currentTarget.dataset),
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onShow: function () {
    // var that=this
    var that = this
    if (wx.getStorageSync("token")) {
      util.get(api.urlPath1+'/app/address').then((res)=>{
        if(res.data.status !== 200) {
          util.post(
            api.urlPath1+ '/app/users/changeSid',
            {
              phone:wx.getStorageSync('phoneNumber')
            }
            ).then((res)=>{
              console.log(res,'重新获取sid')
              var sid_num = res.data
              wx.setStorageSync('sid',sid_num)
          }).catch((errMsg)=>{
            console.log(errMsg,'重新获取sid')
          })
          // wx.request({
          //   url:  app.globalData.urlPath1 + '/app/users/changeSid',
          //   method:'post',
          //   data:{
          //     phone:wx.getStorageSync('phoneNumber')
          //   },
          //   success(res){
          //     console.log(res,'sid')
          //     var sid_num = res.data
          //     wx.setStorageSync('sid',sid_num)
          //   }
          // })
          // console.log('重新获取新的sid')
          // console.log(wx.getStorageSync('phoneNumber'))
        }else{
          if (res.data.result.length>0) {
          console.log('1')
          that.setData({
            dz: false,
            dzlist: res.data.result
          })
          }else{
            console.log('2')
            that.setData({
              dz:true
            })
          }
        }
      }).catch((errMsg)=>{
        console.log(errMsg,'获取地址')
      })
    } else {
      wx.showModal({
        title: '请您先授权登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /*点击可以更换地址*/
  change_address: function (e) {
    var that = this
    console.log(e)
    console.log(e.receiver,e.phone,e.province,e.detail)
    util.put(
      api.urlPath1+'/app/address',
      {
        addressInfo:JSON.stringify(e.currentTarget.dataset.item),
        'sid': wx.getStorageSync("sid"),
        id:e.currentTarget.dataset.item.id
      }
      ).then((res)=>{
        console.log(res,'切换地址')
        if(res.data.status == 200){
          that.back()
        }
    }).catch((errMsg)=>{
      console.log(errMsg,'切换地址')
    })
  }
})