/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-table表格，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value;
	var aqivalue = document.getElementById("aqi-value-input").value;
	if (city == "" || aqivalue == "") { //不能用null,而只能用""，有些费解
		alert("请输入正确值");
		return false;
	}
	city = city.trim();
	aqivalue = aqivalue.trim();
	/*不应该写下列语句，原因在于每句只能查city里有没有中文或者英文项，而像A1这样查不出来的
	var reg1 = new RegExp("[\\u4e00-\\u9fa5]");//匹配中文
	var reg2 = new RegExp("[A-Za-z]"); // 匹配英文*/
	var reg1 = new RegExp("[^\\u4e00-\\u9fa5A-Za-z]");//出现了中英文外的字符返回true
	var reg2 = new RegExp("[^1-9]");
	if(reg1.test(city)) {//如果都不能匹配中英
	 	alert("您的城市输入不正确，请重新输入！");
	 	return false;
	 }
	 if(reg2.test(aqivalue)) {//如果不匹配AQI
	 	alert("您的AQI值不正确，请重新输入！");
	 	return false;
	 }
	 aqiData[city] = parseInt(aqivalue);//一定要写成[]形式，不能写成.city形式
	 //alert(city+":"+aqiData[city]); //^ ^
	
}

/**
 * 渲染aqi-table表格
 */
 function renderAqiList() { //当表table没有数据时，也不显示表头
 	var aqitable = document.getElementById("aqi-table");
 	aqitable.innerHTML = "";
 	/*if(!document.getElementById("tableth")){ //只加一次表头
 		var tr = document.createElement("tr");
 		tr.setAttribute("id","tableth");
 		tr.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
 		aqitable.appendChild(tr);
 	}*/
 	//这里只是想着把aqiData重新遍历，有没有好方法把他加一条，只增一条新的？
 	for(var city in aqiData){ //如果没有数据不加表头
 		if(!document.getElementById("tableth")){ //只加一次表头
 			var tr = document.createElement("tr");
 			tr.setAttribute("id","tableth");
 			tr.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
 			aqitable.appendChild(tr);
 			//下句证明了利用innerHTML写的网页元素可以用DOM获得
 			//alert(document.getElementsByTagName("td")[0].firstChild.nodeValue);
 		}
 		var tr = document.createElement("tr");
 		tr.innerHTML = "<td>"+ city +"</td>"+"<td>"+aqiData[city]+"</td><button>删除</button>";
 		aqitable.appendChild(tr);
 	}

 }
 	
 	

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
 function addBtnHandle() {
 	addAqiData();
 	renderAqiList();
 }

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
 function delBtnHandle() {
   // do sth.
   //arguments[0].parentNode.innerHTML = "";//不需要这样，只要删了aqiData对应属性即可
	var obj=document.elementFromPoint(event.clientX,event.clientY); //from Inetrnet
  	var td = obj.parentNode.getElementsByTagName("td");
   	//aqiData[td[0].firstChild.nodeValue] = undefined; //不能这么删除
   	delete aqiData[td[0].firstChild.nodeValue];
   	renderAqiList();
 }

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  //一定要有onload，否则页面没有加载完是获取不到add-btn按钮对象的---by yh
	window.onload = function(){ 
		var addbtn = document.getElementById('add-btn');
		addbtn.onclick = function(){ 
			addBtnHandle();//为什么不能加括号呢？

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  //这样直接弄是进不来的，必须要页面产生变化
		
		//event.DOMSubtreeModified = function(){
			var delbtn = document.getElementsByTagName("button"); 
			
			for(var i=1; i < delbtn.length; i++){ //第一个button肯定不是
				delbtn[i].onclick = delBtnHandle; 
			}
		};
  
	};
}

init();
