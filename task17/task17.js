/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

var monthdays = [31,30,31,28,31,30,31,31,30,31,30,31];//1-12每月的天数


function getSelectOption(obj){
  for (var i = 0; i < obj.options.length; i++) {
    if (obj[i].selected === true) {
      pageState.nowSelectCity = obj[i].value;
    }
  }
}

function getRadioVal(obj){
  for (var i = 0; i < obj.length; i++) {
    if(obj[i].checked === true) {
      pageState.nowGraTime = obj[i].value;
      
    }
  }
}



/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  // 设置对应数据
  
  var preGraTime = pageState.nowGraTime;
  var gratime = document.getElementsByName("gra-time");
  getRadioVal(gratime);
  alert(pageState.nowGraTime);
  if (preGraTime !== pageState.nowGraTime ) {
      // 调用图表渲染函数
      alert("调用图表渲染函数");
  }
  


}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  // 调用图表渲染函数
  var city = document.getElementById("city-select");
  var preCity = pageState.nowSelectCity;
  getSelectOption(city);
  alert(pageState.nowSelectCity);
  if (preCity !== pageState.nowSelectCity) {
    alert("调用图表渲染函数");
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var formgratime = document.getElementById("form-gra-time");
  var gratime = document.getElementsByName("gra-time");
  for (var i = 0; i < gratime.length; i++) {
     gratime[i].addEventListener("click",graTimeChange,false);
   }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var city = document.getElementById("city-select");
  city.addEventListener("change",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  //处理好存放在chartData中
  for(var elem in aqiSourceData) { //首先遍历对象属性(城市)，每个属性值都是键值
    var aqi = []; //每个城市每一天的aqi值存在这个数组里
    for(var num in aqiSourceData[elem]) {//每个属性，也即每个城市
      aqi[aqi.length] = aqiSourceData[elem][num];
    }
    chartData[elem] = {}; //每个城市对应一个对象
    chartDate[elem].date = aqi; //date对应每天
    
    var dt = new Array("2016-01-01");
    var dt_w = dt.getDay();//返回周几，1,2,3...
    var dt_m = dt.getMonth(); //返回几月份
    var dt_dt = dt.getDate();//返回是每月第几号
    var wk = [];//储存按照week统计方法的均值
    var mt = [];//储存按照month统计方法的均值
    var sum_w = 0;
    var sum_m = 0;
    var acount_w = 0;
    var acount_m = 0;
    for (var i = 0; i < 92; i++) {
      sum_w += aqi[i];
      dt_w++;
      acount_w++;
      if (dt_w === 8) {
        wk[wk.length] = sum_w / acount_w;
        sum_w = 0;
        dt_w = 1;
        acount_w = 0;
      }

      
      sum_m += aqi[i];
      dt_dt++;
      acount_m++;
      if (dt_dt === monthdays[dt_m]+1) {
        mt[mt.length] = sum_m / acount_m;
        sum_m = 0;
        dt_dt = 1;
        dt_m++;
        if (dt_m === 13) {dt_m = 1;}
        acount_m = 0;
      }
      
    }
    if (acount_w !== 0) {
      wk[wk.length] = sum_w / acount_w;
    }
    if (acount_m !== 0) {
      mt[mt.length] = sum_m / acount_m;
    }

    chartDate[elem].week = wk;
    chartData[elem].month = mt;
  }
}

/**
 * 初始化函数
 */
function init() {
  window.onload = function(){
  initGraTimeForm()；
  initCitySelector();
  initAqiChartData();
  };
}

init();