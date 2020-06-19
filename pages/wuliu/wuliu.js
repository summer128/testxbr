
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    wuliu:null,//物流信息列表
    null_logistics:true,
    
  },
  onLoad: function (options) {
    var that = this
    // var info = JSON.parse(unescape(options.info))
    var info = JSON.parse((options.info))
    console.log(info,'物流信息')
    
    that.setData({
      info: info
    })
  },
  onShow: function () {
      var that=this
      util.get(api.urlPath1 +'/app/orders/shipInfo/'+that.data.info.orderInfo.id).then((res)=>{
        console.log(res.data.result,'物流信息')
        console.log(res.data.result.shipName,res.data.result.shipNumber,res.data.result['token'])
        util.get(
          // api.logistics + `?id=${res.data.result['token']}&com=${res.data.result['shipName']}&nu=${res.data.result['shipNumber']}&show=json&order=desc&format=kuaidi100'`
          api.logistics +'?id='+ res.data.result.token + '&com=' + 'shunfeng' + '&nu=' +'299328255922'+'&show='+'json'+'&order'+'desc'+'&format='+'kuaidi100' 
          ).then((res)=>{
            if(res.data.status == 0){
              console.log('没有物流信息')
              console.log(that.data.null_logistics)
              that.setData({
                null_logistics:true,
              })
            }else{
              console.log('有物流信息')
              that.setData({
                wuliu:res.data.data,
                null_logistics:false
              })
              console.log(that.data.null_logistics)
            }
          }).catch((errMsg)=>{
            console.log(errMsg,'物流错误信息')
          })
      })
  }
})