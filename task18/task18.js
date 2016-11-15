var EventUtil = {
	addHandler: function(element, event, handler){
		if (element.addEventListener) {
			element.addEventListener(event,handler,false);
		}else if (element.attachEvent) {
			element.attachEvent("on"+event,handler);
		}else{
			element["on"+event] = handler;
		}
	},
	removeHandler: function(element, event, handler){
		if (element.removeEventListener) {
			element.removeEventListener(event,handler,false);
		}else if (element.attachEvent) {
			element.detachEvent("on"+event,handler);
		}else{
			element["on"+event] = null;
		}
	}
}

function getValue(){
	if (document.getElementById("in").value === null) {
		return null;
	}else{
	return document.getElementById("in").value;
	}
}



function addLeft(val){
	var wrapper = document.getElementById("wrapper");
	var p = document.createElement("div");
	var txt = document.createTextNode(val);
	p.appendChild(txt);
	p.style.background = "red";
	p.style.color = "white";
	p.style.fontSize = "12px";
	p.style.height = "18px";
	p.style.lineHeight = "18px";
	p.style.width = "18px";
	p.style.marginLeft = "5px";
	p.style.textAlign = "center";
	p.style.display = "inline-block";
	if (wrapper.firstChild == null) {
		wrapper.appendChild(p);
	}else{
		wrapper.insertBefore(p, wrapper.firstChild);
	}
}

function addRight(val){
	var wrapper = document.getElementById("wrapper");
	var p = document.createElement("div");
	var txt = document.createTextNode(val);
	p.appendChild(txt);
	p.style.background = "red";
	p.style.color = "white";
	p.style.fontSize = "12px";
	p.style.height = "18px";
	p.style.lineHeight = "18px";
	p.style.width = "18px";
	p.style.marginLeft = "5px";
	p.style.textAlign = "center";
	p.style.display = "inline-block";
	wrapper.appendChild(p);
}

function deleteLeft(){
	var wrapper = document.getElementById("wrapper");
	wrapper.removeChild(wrapper.firstChild);
}

function deleteRight(){
	var wrapper = document.getElementById("wrapper");
	wrapper.removeChild(wrapper.lastChild);
}


var zcin = document.getElementById("zcin");
var ycin = document.getElementById("ycin");
var zcout = document.getElementById("zcout");
var ycout = document.getElementById("ycout");

window.onload = function() {
	EventUtil.addHandler(zcin, "click" , function(){
		var el = getValue();
		if (el !== "") {
			addLeft(el);
			document.getElementById("in").value = "";
		}
	});
	EventUtil.addHandler(ycin, "click" , function(){
		var el = getValue();
		if (el !== "") {
			addRight(el);
			document.getElementById("in").value = "";
		}
	});
	EventUtil.addHandler(zcout,"click",function(){
		deleteLeft();
	});
	EventUtil.addHandler(ycout,"click",function(){
		deleteRight();
	});
}