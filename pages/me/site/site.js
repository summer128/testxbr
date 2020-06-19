const app = getApp()
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
Page({
  data: {
    num: 0,
    flag1: false,
    receiver:null,
    phone:null,
    region:null,
    detail:null,
    id:null,
    // region:'',
    isDefault:'',
    id1:null
},
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  
  ///////////获取联系人input////////////////
  receiver:function(e){
    console.log(e.detail.value,'获取联系人')
    this.setData({
      receiver: e.detail.value
    })
  },
  ///////////获取手机号input///////////////
  phone: function (e) {
    console.log(e.detail.value,'获取手机号input')
    this.setData({
      phone: e.detail.value
    })
  },
  ////////////获取城市input//////////////
  region: function (e) {
    console.log(e.detail.value,'获取城市input')
    this.setData({
      region: e.detail.value
    })
  },
  ///////////获取详细地址input///////////////
  detail: function (e) {
    console.log(e.detail.value,'获取详细地址input')
    this.setData({
      detail: e.detail.value
    })
  },
  /////////////保存地址//////////////////////////
  save:function(){
    var that = this
    // 判断有没有传id,有走编辑，没有走添加
    if(that.data.click_listid){
      // console.log('编辑地址')
      var addressInfo = {
          receiver: this.data.receiver == null ? that.data.click_lists.receiver : this.data.receiver,
          phone: this.data.phone == null ? that.data.click_lists.phone : this.data.phone,
          country: wx.getStorageSync("userInfo").country,
          province: this.data.region == null ? that.data.click_lists.region : this.data.region,
          city: this.data.detail == null ? that.data.click_lists.detail : this.data.detail,
          region: this.data.region == null ? that.data.click_lists.region : this.data.region,
          detail: this.data.detail == null ? that.data.click_lists.detail : this.data.detail,
          isDefault: 0
        };
        util.put(
          api.urlPath1+'/app/address',
          {
            addressInfo:JSON.stringify(addressInfo),
            'sid': wx.getStorageSync("sid"),
            id:that.data.click_listid
          }
          ).then((res)=>{
            if (res.data.status == 200){
              wx.showModal({
                title: '修改成功',
                success(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../shippingAddress/shippingAddress'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
        }).catch((errMsg)=>{
          console.log(errMsg,'保存地址')
        })
    }else{
      // console.log('添加地址')
      var addressInfo = {
        receiver: this.data.receiver,
        phone: this.data.phone,
        country: wx.getStorageSync("userInfo").country,
        province: this.data.region,
        city: this.data.detail,
        region: this.data.region,
        detail: this.data.detail,
        isDefault: 0
      };
       util.post(
        api.urlPath1+'/app/address',
        {
          addressInfo: JSON.stringify(addressInfo),
          'sid': wx.getStorageSync("sid")
        }
        ).then((res)=>{
          if (res.data.status == 200){
            wx.showModal({
              title: '保存成功',
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../shippingAddress/shippingAddress'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }).catch((errMsg)=>{
          console.log(errMsg,'添加地址')
        })
    }
  },
  // 设置的默认地址
  delectColor: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      flag1: !this.data.flag1
    })
    if (this.data.flag1){
      wx.showLoading({
        title: '设置成功',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    }else{
      wx.showLoading({
        title: '取消成功',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    }
    console.log(this.data.flag1)
   
    
    if(this.data.flag1){
      var that=this
      console.log('设置默认', e.currentTarget.dataset.id)
     
      console.log(e.currentTarget.dataset.id)
      util.put(
        api.urlPath1+'/app/address/default',
        {
          id: e.currentTarget.dataset.id,
          'sid': wx.getStorageSync("sid")
        }
        ).then((res)=>{
        
      }).catch((errMsg)=>{
        console.log(errMsg,'收藏')
      })
    }
  },
  // 删除收货地址
  setValue:function(){
     util.deletes(api.urlPath1+'/app/address/'+`${this.data.click_listid}`).then((res)=>{
        if (res.data.status == 200) {
          wx.showModal({
            title: '删除成功',
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../shippingAddress/shippingAddress'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }).catch((errMsg)=>{
        console.log(errMsg,'收藏')
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options == ''){
      console.log('空空乳液')
      this.setData({
        optioned:options
      })
    }else{
      console.log(JSON.parse(options.click_list).id)
      var that = this
      var click_listid = JSON.parse(options.click_list).id.id
      var click_lists = JSON.parse(options.click_list).id
      that.setData({
        isDefault: options.isDefault,
        id1: options.id,
        click_lists:click_lists,
        click_listid:click_listid
      })

       if (click_lists.isDefault =='true') {
        console.log('1')
        that.setData({
          flag1: true
        })
      } else{
        console.log('2')
        that.setData({
          flag1: false
        })
      }
    }
  }
})