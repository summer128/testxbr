
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
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
  // onLoad(options){
  //   console.log(options)
  //   console.log(JSON.parse(options.dzlist))
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   console.log(options)
  //   var that = this
  //   if (wx.getStorageSync("token")){
  //     wx.request({
  //       url: app.globalData.urlPath1 + '/app/address',
  //       method: 'get',
  //       header: {
  //         'token': wx.getStorageSync("token"),
  //         'authorization': wx.getStorageSync("sid")
  //       },
  //       success(res) {
  //         console.log(res,'收货地址')
  //         if(res.data.status !== 200){
  //           console.log('收货地址')
  //         }else{
  //           if (res.data.result.length>0) {
  //             that.setData({
  //               dz: false,
  //               dzlist: res.data.result
  //             })
  //           }else{
  //             that.setData({
  //               dz: true
  //             })
  //           }
  //         }
  //       }
  //     })
  //   }else{
  //     wx.showModal({
  //       title: '请您先授权登录',
  //       success(res) {
  //         if (res.confirm) {
  //           wx.switchTab({
  //             url: '../me'
  //           })
  //         } else if (res.cancel) {
  //           console.log('用户点击取消')
  //         }
  //       }
  //     })
  //   }
  // },
  onShow: function () {
    // var that=this
    var that = this
    if (wx.getStorageSync("token")) {
      wx.request({
        url: app.globalData.urlPath1 + '/app/address',
        method: 'get',
        header: {
          'token': wx.getStorageSync("token"),
          'authorization': wx.getStorageSync("sid")
        },
        success(res) {
          console.log(res,'收货地址')
          if(res.data.status !== 200) {
            wx.request({
              url:  app.globalData.urlPath1 + '/app/users/changeSid',
              method:'post',
              data:{
                phone:wx.getStorageSync('phoneNumber')
              },
              success(res){
                console.log(res,'sid')
                var sid_num = res.data
                wx.setStorageSync('sid',sid_num)
              }
            })
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
        }
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
    wx.request({
      url: app.globalData.urlPath1+'/app/address',
      method: 'put',
      data: {
        addressInfo:JSON.stringify(e.currentTarget.dataset.item),
        'sid': wx.getStorageSync("sid"),
        id:e.currentTarget.dataset.item.id
      },
      header: {
        'content-type': "application/x-www-form-urlencoded",
        'token': wx.getStorageSync("token"),
      },
      success(res){
        console.log(res,'切换地址')
        if(res.data.status == 200){
          that.back()
        }
      }
    }) 
  }
})