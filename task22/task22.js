var divList = [];

function DLR(node){   //前序遍历
	if (node !== null) {
		divList[divList.length] = node;
		DLR(node.firstElementChild);
		if (node.lastElementChild != node.firstElementChild) {
			DLR(node.lastElementChild);
		}
	}
}

function LDR(node) {  //中序遍历
	if (node !== null) {
		LDR(node.firstElementChild);
		divList[divList.length] = node;
		if (node.lastElementChild != node.firstElementChild) {
			LDR(node.lastElementChild);
		}
	}
}

function LRD(node) {
	if (node !== null) {
		LRD(node.firstElementChild);
		if (node.lastElementChild != node.firstElementChild) {
			LRD(node.lastElementChild);
		}
		divList[divList.length] = node;
	}
}

function divListTurn(){
	divList[0].style.backgroundColor = 'blue';
	var i = 1;
	var timer = setInterval(function(){
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = 'white';
			console.log(i);
			divList[i++].style.backgroundColor = 'blue';
		}else{
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = 'white';
		}
	},1000);
	
	
}

window.onload = function(){
	document.getElementById("DLR").onclick = function(){
		divList = [];
		DLR(document.getElementById("c0"));
		divListTurn();
	};
	document.getElementById("LDR").onclick = function(){
		divList = [];
		LDR(document.getElementById("c0"));
		divListTurn();
	};
	document.getElementById("LRD").onclick = function(){
		divList = [];
		LRD(document.getElementById("c0"));
		divListTurn();
	};
}