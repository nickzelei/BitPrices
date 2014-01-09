var bitstampURL = "https://www.bitstamp.net/api/ticker/"; // BitStamp's prices
window.addEventListener("load", function() {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", bitstampURL, false);
	xmlhttp.send(null);
	if (xmlhttp.status == 200) {
		var data = JSON.parse(xmlhttp.responseText);
		console.log(data);
		console.log("////////");
		console.log(data.last);
		  for (var key in data) {
			if (key == "timestamp")
			{
				var date = new Date(data[key]*1000);
				var curDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
				data[key] = curDate + " " + date.toLocaleTimeString();
			}
		  	var lastChild = document.createTextNode(key+": "+data[key]);
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