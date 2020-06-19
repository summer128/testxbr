<<<<<<< HEAD
// pages/index/healthTest/formalTest/formaltest.js
=======
>>>>>>> master
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tests_id:'',
    problemidx:1,
    is_submit:false,
    problemlength:'',
    highlight:false,
    // click_is:null,
    opacity:0.4 
  },
  back(){
    wx.navigateBack({
      delta:1
    })
  },
  onLoad: function (options) {
    var that = this
   
    console.log(options)
    console.log(JSON.parse(options.fromaltest))
    var tests_data = JSON.parse(options.fromaltest)
    that.setData({
      tests_id:tests_data.info.id,
      problemdata:tests_data.data,
      problemlength:tests_data.data.length
    })
    // console.log(that.data.problemdata)
    // console.log(that.data.problemlength)
    wx.setNavigationBarTitle({
      title: tests_data.info.title,
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#FFFFFF'
    })
  },
  /**
   * 下一个题
   */
  next_problem: function (e) {
    var that = this
    console.log(e)
    var idx =  e.currentTarget.dataset.selectindex
    that.setData({
      click_is:idx
    })
    that.setData({
      problemidx:that.data.problemidx+=1,
      click_is:-1
    })
    // console.log(that.data.problemidx)
    // console.log(that.data.click_is,'click_is')
     if(that.data.problemidx >= that.data.problemlength-1){
      that.setData({
        is_submit:true,
        problemidx:that.data.problemlength-1,
        click_is:idx
      })
    }
  },
  // 提交
  test_result(){
    wx.navigateTo({
      url: '../testResult/testresult?id='+ this.data.tests_id,
    })
<<<<<<< HEAD
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

=======
>>>>>>> master
  }
})