var urlPath =  "http://test.shanyide.cn";
var urlPath1 = "https://test.shanyide.cn:5555/api/v1";
var urlToken = "http://test.shanyide.cn/api/cash/v2";
var urlPath2 = "http://test.shanyide.cn/api/v2";  
var urlPath3 = "http://test.shanyide.cn/api/v3";
var urlPath4 = "http://test.shanyide.cn/api/cash/v4";

module.exports = {
  shopCity: urlPath1 + '/app/goods',//获取商城--轮播
  my: urlPath1 + '/app/users',//获取手机号和sid
  getToken: urlToken + '/token', //获取token值
  favorite: urlPath1 + '/app/goods/favorite?pageNum=0&pageSize=100',//首页-收藏
  healthTest: urlPath3 + '/home/exam', //资讯--健康测评--8个分类
  realTimeInfo : urlPath3 + '/home',//资讯页的首接口
  healthClass: urlPath3 + '/classroom/flush',//资讯-健康小课堂
}



