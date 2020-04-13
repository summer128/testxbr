const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
function day() {
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);
  var dataArr = [];
  var weeks = ['日', '一', '二', '三', '四', '五', '六'];
  while ((endDate.getTime() - startDate.getTime()) >= 0) {
    var month = (startDate.getMonth() + 1).toString().length == 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
    var day = startDate.getDate().toString().length == 1 ? "0" + startDate.getDate() : startDate.getDate();
    var week = weeks[startDate.getDay()];
    var cur_year = startDate.getFullYear();
    var data = {
      week: '周' + week,
      //date: cur_year + "-" + month + "-" + day
      date: month + "-" + day
    }
    dataArr.push(data);
    startDate.setDate(startDate.getDate() + 1);

  }
  dataArr.forEach((item, index, arr) => {
    dataArr[0].week = '今天';
    dataArr[1].week = '明天';
  })
  // dataArr[0] = dataArr[0].slice(0, 6) + '今天';
  // dataArr[1] = dataArr[1].slice(0, 6) + '明天';
  // dataArr[2] = '后天' + dataArr[2].slice(6, 10);
  // console.log(dataArr);
  return dataArr;
}
function time(status) {
  var timeArr = [{ 'id': 1, 'time': '00:00-01:00', "checked": status }, { 'id': 2, 'time': '01:00-02:00', "checked": status }, { 'id': 3, 'time': '02:00-03:00', "checked": status }, { 'id': 4, 'time': '03:00-04:00', "checked": status }, { 'id': 5, 'time': '04:00-05:00', "checked": status }, { 'id': 6, 'time': '05:00-06:00', "checked": status }, { 'id': 7, 'time': '06:00-07:00', "checked": status }, { 'id': 8, 'time': '07:00-08:00', "checked": status }, { 'id': 9, 'time': '08:00-09:00', "checked": status }, { 'id': 10, 'time': '09:00-10:00', "checked": status }, { 'id': 11, 'time': '10:00-11:00', "checked": status }, { 'id': 12, 'time': '11:00-12:00', "checked": status }, { 'id': 13, 'time': '12:00-13:00', "checked": status }, { 'id': 14, 'time': '13:00-14:00', "checked": status }, { 'id': 15, 'time': '14:00-15:00', "checked": status }, { 'id': 16, 'time': '15:00-16:00', "checked": status }, { 'id': 17, 'time': '16:00-17:00', "checked": status }, { 'id': 18, 'time': '17:00-18:00', "checked": status }, { 'id': 19, 'time': '18:00-19:00', "checked": status }, { 'id': 20, 'time': '19:00-20:00', "checked": status }, { 'id': 21, 'time': '20:00-21:00', "checked": status }, { 'id': 22, 'time': '21:00-22:00', "checked": status }, { 'id': 23, 'time': '22:00-23:00', "checked": status }, { 'id': 24, 'time': '23:00-24:00', "checked": status }, { 'id': 27, 'time': '09:00-13:00', "checked": status }, { 'id': 26, 'time': '13:00-17:00', "checked": status }, { 'id': 28, 'time': '17:00-21:00', "checked": status }]
  return timeArr
}
module.exports = {
  day: day,
  time: time,
}