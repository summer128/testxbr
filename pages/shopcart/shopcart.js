
const app=getApp()
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
const orginalPrice = 0; //由于0.00在赋值时是0，用toFixed()取余
Page({
  data: {
    num: 1,
    forucontent:null,
    imgurl:true,
    info:null,
    price5:null,
    selected: false,
    carts: [],        // 购物车列表
    hasList: false,     // 列表是否有数据
    totalPrice: 0,      // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    select1:true,
    onshow5:false,
    onshow6:false,
    text:'编辑',
    goodList: [],
    checkAll: false,
    'totalCount': 0,
    // 'totalPrice': 0,
    onshow9:true,
    onshow10:false,
    footer:false,
    login:true,
    statusBarHeight: app.globalData.statusBarHeight,
    value:null,
    bz:null,
    id:null,
    dzid:null,
    selectvalue:null,
    value1:null,
    listlist:null,
    all:false,
    goodLists:[],

    // 点击对应的商品
    selectBook: true,
    // selectAllStatus: false, // 全选状态，默认全选
    all_price:0,
    totalPrices: orginalPrice.toFixed(2), // 最终总价，初始为0
    totaldss:0,  //定义参数，是每次选中的商品累加
    totalCounts:0, //总共几件商品
    selectedproduct:[],//选择的商品
    all_carts:[], //全选时的商品
    selecteds:'',
    is_show:true, //购物车为空，false

    state:null,//返回的状态
  },

  // 单选
  selectListsss(e) {
    var that = this
    this.calculateTotal()
    // console.log('选择的商品',e)
    // console.log(that.data.goodList)
    // console.log(that.data.selectedproduct)
    var index  = e.currentTarget.dataset.index
    let selectAllStatus = that.data.selectAllStatus; //是否已经全选
    let str = true;  //用str与每一项进行状态判断
   
    let carts =  that.data.goodList    //获取购物车列表
    const selecteds = carts[index].checked;
    carts[index].checked = !selecteds; 
    
   
    that.getTotalPrice()    //从新获取总价
    for (var i = 0; i < carts.length; i++) {
      console.log(carts[i])
      str = str && carts[i].checked;    
      // console.log(str)       //用str与每一项进行状态判断
    }
    
    // 如果数组数据全部为selected[true],全选
    if (str === true) {
      that.setData({
        selectAllStatus: true,
        checkAll:true
      })
    } else {
      that.setData({
        selectAllStatus: false,
        checkAll:false
      })
    }
    this.setData({
      goodList : carts
    })
    
  },

  // 计算总价格
  getTotalPrice() {
    let carts = this.data.goodList;
    let all_price = parseFloat(this.data.all_price)
    let totald = 0;
    this.data.selectedproduct = []
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].checked) { // 判断选中才会计算价格
       this.data.selectedproduct.push(carts[i])
      //  这出现了一个错误，如果不在data里面新建参数totaldss，那么每次都是第一次的钱数+第一次的钱数+第二次的钱数！！！！！
        this.data.totaldss = totald += parseFloat(carts[i].goodsNum * carts[i].goodsPrice); // 所有价格加起来
      }
    }
    console.log('计算总价格的时候选择的商品',this.data.selectedproduct)
    var selectnums = this.data.selectedproduct.length
    var selectlength = this.data.selectedproduct
    // console.log(this.data.selectedproduct) //  获取选中的几条数据
    // 判断选中的数据有几条，如果一条也没有总价为0
    if(selectnums == 0) {
      this.setData({
        totaldss:0
      })
    }
    this.setData({
      all_price: totald.toFixed(2)
    })
    totald += all_price;
    this.setData({ // 最后赋值到data中渲染到页面
      goodList: carts, 
      totalPrices: this.data.totaldss.toFixed(2), //保留小数后面2两位
      totalCounts:selectnums
    })
  },
  // 点击结算的方法
  order:function(e){
    var that = this
    console.log('去结算',e)
    var totalPrice = that.data.totalPrices;
    var goodsCarts = that.data.goodList;
    var goods_Cart = that.data.selectedproduct
    console.log(goods_Cart)
    var skuList = [{ "id":goods_Cart[0].skuId, "number":goods_Cart[0].goodsNum}]
    util.get(api.urlPath1+ '/app/orders/coupon?skuList=' + JSON.stringify(skuList)).then((res)=>{
      console.log(res,'gouwu')
      wx.navigateTo({
        url: '../orders/orders?list=' + JSON.stringify(goods_Cart) + '&isFreeDelivery=' + res.data.result.isFreeDelivery + '&signleYiyuanActivityGoods=' + res.data.result.signleYiyuanActivityGoods,
      })
    })
  },
  collet:function(e){
    console.log(e)
  },
  login:function(){
    if (!wx.getStorageSync("token")){
      wx.switchTab({
        url: '../me/me'
      })
    }
  },
  tz(e) {
    console.log(e)
   wx.navigateTo({
      url: "../product/product?id=" + e.currentTarget.dataset.id
    })
  },
  // 点击编辑
  edit:function(e){
    this.setData({
        selectvalue:null,
        all:false
    })
    e.currentTarget.dataset.id = !e.currentTarget.dataset.id
    // console.log(e.currentTarget.dataset.id)
    // console.log(this.data.onshow5)
    // console.log(this.data.goodList)
    // console.log(this.data.all)
    
    if (this.data.onshow5==true){
        this.setData({
          text:'完成',
          onshow9:false,
          onshow10:true
        })
    }else{
        this.setData({
          text: '编辑',
          onshow9:true,
          onshow10:false
        })
    }
    this.setData({
      onshow5:!this.data.onshow5,
      selected: !this.data.selected
    })
  },
  onLoad: function (options) {
    var that=this
    
    console.log(app.globalData.userInfo)
      util.get(api.urlPath1+ '/app/address/default').then((res)=>{
        that.setData({
          dzlist: res.data.result,
          dzid: res.data.result.id,
          id: res.data.result.id
        })
      })
  },
  // 编辑--删除
  delete:function(){
    var that=this
    // console.log(that.data.value)
    // console.log(that.data.listlist)
    // console.log(that.data.selectedproduct)
    wx.showModal({
      title: '提示',
      content:'确定要删除商品吗?',
      success(res) {
        if (res.confirm) {
          if(that.data.goodList.length === 0 || that.data.selectedproduct.length == 0){
            console.log('未选中商品')
            wx.showToast({
              title: '未选择任何商品',
              icon: 'none',
              mask: true
            })
          }
            if(that.data.selectAllStatus===true){
              for (var i = 0; i < that.data.goodList.length;i++){
                console.log( that.data.selectedproduct)
                util.deletes(api.urlPath1+ '/app/buyerCart/' + that.data.goodList[i].skuId).then((res)=>{
                  that.setData({
                    goodList:res.data.result,
                    selectAllStatus:false
                  })
                })
                that.setData({
                  totalPrices:0,
                  totalCounts:0
                })
              }
            }else if(that.data.goodList.length == 0 || that.data.selectedproduct.length == 0){
              console.log('未选中商品')
              wx.showToast({
                title: '未选择任何商品',
                icon: 'none',
                mask: true
              })
            }
            else{
              for (var i = 0; i < that.data.selectedproduct.length;i++){
                    console.log( that.data.selectedproduct)
                    util.deletes(api.urlPath1+ '/app/buyerCart/' + that.data.selectedproduct[i].skuId).then((res)=>{
                      that.data.selectedproduct.splice(0,1)
                        that.setData({
                          goodList:res.data.result,
                          selectAllStatus:false
                        })
                    })
                    that.setData({
                      totalPrices:0,
                      totalCounts:0
                    })
                }
            }
            that.onShow()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow: function () {
    var that = this
    // 用户返回页面时全选状态为false
    that.setData({
      selectAllStatus : false
    })
    that.setData({
      totalCount: 0,
      totalPrice: 0,
      // checkAll:false,
      // all:false,
      selectedproduct:[]
    })
    // console.log('返回购物车页面',that.data.selectedproduct)

    // 返回购物车页面that.data.selectedproduct为空，所以总价和件数为0
    if(!that.data.selectedproduct.length){
      this.setData({
        totalPrices:0,
        totalCounts:0
      })
    }
    util.get(api.urlPath1 + '/app/goods/recommend').then((res)=>{
      that.setData({
        forucontent: res.data.result
      })
    })
  
    util.get(api.urlPath1+ '/app/buyerCart').then((res)=>{
      var  aa = res.data.status == 200 ? that.data.state = 200 : that.data.state = 401
        console.log(aa)
        that.setData({
          listlist:res.data.result,
          state:aa
        })
        // console.log(that.data.state,'state')
        if(res.data.result.length>=1){
          that.setData({
            footer:true,
            id: res.data.result.skuId,
            selectvalue:res.data.result,
            value1:res.data.result
          })
        }

        if(res.data.result.length <= 0){
          that.setData({
            is_show:false
          })
        }else{
          that.setData({
            is_show:true
          })
        }
        let goodList = res.data.result;         // 获取购物车列表
        var numcount=0;
        var pricecount=0;
        for (var i = 0; i < goodList.length; i++) {
          goodList[i].checked = false;
          console.log(goodList[i].goods)
          numcount += Number(goodList[i].goodsNum)
          pricecount += Number(goodList[i].goodsPrice) * Number(goodList[i].goodsNum)
        }
        console.log(numcount)
        console.log(pricecount)
        that.setData({
          goodList: res.data.result,
         
        })
    })
  },

  // 总价的计算
  calculateTotal: function () {
    var goodList = this.data.selectedproduct;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      console.log(goodList)
      var good = goodList[i];
      // 当点击选择按钮总价变化
      if (good.checked) {
        totalCount += Number(good.goodsNum);
        // console.log(Number(good.goodsPrice))
        totalPrice += parseInt(good.goodsNum) * Number(good.goodsPrice);
      }
    }
    totalPrice = totalPrice.toFixed(2);
    // .toFixed(2)
    this.setData({
      'totalPrices': totalPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    console.log(e)
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = Number(goodList[index].goodsNum);
    if (count <= 1) {
      return;
    } else {
      Number(goodList[index].goodsNum--);
      this.setData({
        'goodList': goodList
      });
      this.calculateTotal();
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    Number(goodList[index].goodsNum++);
    // Number(goodList[index].goodsNum++);  //数量加加
    var count = Number(goodList[index].goodsNum)
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal(); //点加加的时候在这个里面做的计算
  },
  /**
   * 用户点击全选
   */
  all_select(){
    for (var i = 0; i < this.data.goodList.length; i++) {
      console.log('点击全选的状态',this.data.goodList[i].checked)
      this.data.goodList[i].checked = this.data.selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus:this.data.selectAllStatus,
      goodList : this.data.goodList
    })
  },

  selectalltap: function (e) {
    var that = this
    //点击全选 高亮
    that.setData({
      selectAllStatus:!that.data.selectAllStatus
    })
    // console.log('用户全选触发的事件',e)
    let selectAllStatus = that.data.selectAllStatus 
    let carts = that.data.goodList; 
    // console.log('用户全选的状态',selectAllStatus)

    if(selectAllStatus == true){
      that.all_select()
      that.getTotalPrice()
    }else{
      // console.log(that.data.selectedproduct)
      that.all_select()
      that.setData({
        totalCounts:0,
        totalPrices:0,
        selectedproduct:[]
      })
    }

    
    if (carts.length === 0) { //当没有物品时，不能再点“全选”
      wx.showToast({
        title: '购物车为空',
        icon: 'none',
        mask: true
      })
      that.setData({
        selectAllStatus : false
      })
    }
  }
})



