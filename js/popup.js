var ticker = "https://www.bitstamp.net/api/ticker/";
var transactions = "https://www.bitstamp.net/api/transactions/";
window.addEventListener("load", function() {	
	$.ajax({
		type: 'GET',
		url: ticker,
		cache: false
	})
	.done(function(data) {
		processTicker(data);
	})
	.fail(function() {
		console.log("Ticker failed!");
	});
	
	$.ajax({
		type: 'GET',
		url: transactions,
		cache: false
	})
	.done(function(data) {
		processTrans(data);
	})
	.fail(function() {
		console.log("Transactions failed!");
	})
	
	function processTicker(data) {
		for (var key in data) {
			if ($('#' + key).length > -1) {
				if (key === "timestamp") {
					var d = new Date(data[key] * 1000);
					data[key] = d.getFullDate(); 
				}				
				$('#' + key).html(data[key]);
			}
		}
	};
	
	function processTrans(data) {
		var transLog = [];
		var prevPrice = 0;
		
		for (var key in data) {
			var current = data[key];
			current.price = Math.floor(current.price);
			current.amount = parseFloat(current.amount);

			if (current.price != prevPrice) {
				transLog.push({
					'date': current.date,
					'amount': current.amount,
					'price': current.price
				});
				prevPrice = current.price;
			}
			else {
				transLog[transLog.length-1].amount += current.amount;				
			}			
		}
		//transLog.sort(function (a, b) { return b.price - a.price; });
		if (transLog.length > -1) {
			var table = document.getElementById("transTable");
			for (var i = 0; i < transLog.length; i++) {
				var row = table.insertRow(i);
				var cellAmt = row.insertCell(0);
				var cellTime = row.insertCell(1);
				var cellPrice = row.insertCell(2);
				
				cellAmt.innerHTML = transLog[i].amount.toFixed(2);
				cellAmt.className = "col-2";
				cellTime.innerHTML = $.timeago((new Date(transLog[i].date * 1000).toISOString()));
				cellTime.className = "col-3";
				cellPrice.innerHTML = transLog[i].price;
				cellPrice.className = "col-2";
			}
		}
	};
});

Date.prototype.getFullDate = function() {
	return (this.getFormattedMonth()) + " "  + this.getDate() + ", " + this.getFullYear() + " " + this.toLocaleTimeString();
};

Date.prototype.getFormattedMonth = function() {
	switch (this.getMonth()) {
		case 0:
			return "Jan";
		case 1:
			return "Feb";
		case 2:
			return "Mar";
		case 3:
			return "Apr";
		case 4:
			return "May";
		case 5:
			return "Jun";
		case 6:
			return "Jul";
		case 7:
			return "Aug";
		case 8:
			return "Sep";
		case 9:
			return "Oct";
		case 10:
			return "Nov";
		case 11:
			return "Dec";
		default:
			return "Jan";
	}
};