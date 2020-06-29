const util = require('../../../../utils/util.js')
const api = require('../../../../config/api.js')
Page({
  data: {
    // testtitle:'23',
    testid:'',
    coverUrl:'',//开始的背景图片
    people_nums:'',
    formaltest:''
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: JSON.parse(options.test_infom).test_title,
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
    wx.setNavigationBarTitle({
      title:JSON.parse(options.test_infom).test_title
    })
    console.log(options,'健康测评入口')
    that.setData({
      // testtitle:JSON.parse(options.test_infom).test_title,
      testid:JSON.parse(options.test_infom).test_id
    })
    util.get(api.urlPath3+'/home/exam/info'+'/'+that.data.testid).then((res)=>{
      var sign = ['A','B','C','D']
        
        for(var i=0;i<res.data.data.length;i++){
          res.data.data[i].signs = sign
        }
        that.setData({
          coverUrl:res.data.info.coverUrl,
          people_nums:res.data.info.label,
          label_color:res.data.info.labelRGB,
          button_color:res.data.info.buttonRGB,
          formaltest:res.data
        })
    }).catch((errMsg)=>{
      console.log(errMsg,'健康测试入口err')
    })
  },
  // 开始答题
  start_test(){
    wx.navigateTo({
      url: '../formalTest/formaltest?fromaltest=' + JSON.stringify(this.data.formaltest),
    })
  }
})