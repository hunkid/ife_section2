
function test1(){
	var text1 = document.getElementById("text1");
	var txt = text1.value;
	if (txt.length >= 4 && txt.length <= 16) {
		alert("验证成功！");
		text1.style.border = "1px solid green";
	}
	else{
		text1.style.border = "1px solid red";
		alert("字符数必须为4～16位");
	}
}

function test2(){
	var text2 = document.getElementById("text2");
	var txt = text2.value;

	if (txt.search(/^\w{1}|[]$/) == -1) {
		text2.style.border = "1px solid red";
		alert("您输入的不正确");
	}else{
		alert("验证成功！");
		text2.style.border = "1px solid green";
	}
}

function test3(){
	var text3 = document.getElementById("text3");
	var txt = text3.value;

	if (txt.search(/^[\u4e00-\u9fa5]{2}$/) == -1) {
		text3.style.border = "1px solid red";
		alert("您输入的不正确");
	}else{
		alert("验证成功！");
		text3.style.border = "1px solid green";
	}
}

window.onload = function(){
	document.getElementById("btn1").onclick = test1;
	document.getElementById("btn2").onclick = test2;
	document.getElementById("btn3").onclick = test3;

};