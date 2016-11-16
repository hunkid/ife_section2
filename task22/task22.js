function LRD(node){
	if (node.getElementsByTagName('div').length != 0) {
		setTimeout(function(){LRD(node.childNodes[1]);},1000);
	}
	
	if (node.getElementsByTagName('div').length != 0 &&node.childNodes[1] !== node.childNodes[node.childNodes.length-2]) {
		setTimeout(function(){LRD(node.childNodes[node.childNodes.length-2]);},1000);
	}

	node.style.backgroundColor = "blue";
	setTimeout(function(){
	 	node.style.backgroundColor = "white";
	 },1000);
}
var i =0;
function LDR(node){
	if (node.getElementsByTagName('div').length != 0) {
		setTimeout(function(){LRD(node.childNodes[1]);},1000);
	}
	node.style.backgroundColor = "blue";
	// console.log(node.getAttribute("class")+"\n");
	
	setTimeout(function(){
	 	node.style.backgroundColor = "white";
	 },1000);
	if (node.getElementsByTagName('div').length != 0 &&node.childNodes[1] !== node.childNodes[node.childNodes.length-2]) {
		setTimeout(function(){LRD(node.childNodes[node.childNodes.length-2]);},2000);
	}
}


setTimeout(function(){LDR(document.getElementById("c0"))},1000);