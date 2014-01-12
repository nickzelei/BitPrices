//Created by Nick Zelei
//1/12/2014
var bitstampURL = "https://www.bitstamp.net/api/ticker/"; // BitStamp's prices
window.addEventListener("load", function() {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", bitstampURL, false);
	xmlhttp.send(null);
	if (xmlhttp.status == 200) {
		var data = JSON.parse(xmlhttp.responseText);
		//console.log(data);
		//console.log("////////");
		//console.log(data.last);
		var bitcoin = data["last"];
		var conversions = new Array();
		conversions["mBTC"] = Number(bitcoin * .001).toLocaleString();
		conversions["cBTC"] = Number(bitcoin * .01).toLocaleString();
		conversions["dBTC"] = Number(bitcoin * .1).toLocaleString();
		conversions["microBTC"] = Number(bitcoin * .000001).toLocaleString();
		conversions["satoshi"] = Number(bitcoin * .00000001).toLocaleString();
		conversions["daBTC"] = Number(bitcoin * 10).toLocaleString();
		conversions["hBTC"] = Number(bitcoin * 100).toLocaleString();
		conversions["kBTC"] = Number(bitcoin * 1000).toLocaleString();
		conversions["MBTC"] = Number(bitcoin * 1000000).toLocaleString();
		
		for (var key in conversions) {
			//conversions[key] = Number(conversions[key].toLocaleString());
			var lastChild = document.createTextNode(conversions[key] + " USD/"+key);
			document.getElementById(key).appendChild(lastChild);
			//nextLine()			
		  }
	}
	else {
		document.body.innerHTML = "Failed to load the data!";
	}
});

function nextLine(){
var lastChild = document.createTextNode("\n");
document.getElementById("elements").appendChild(lastChild);
}