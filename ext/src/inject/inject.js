chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		console.log("BEG");

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = handleStateChange;
		xhr.open("POST", "http://localhost:8080", true);
		var arr = [];
		for (i = 0; i < document.images.length; i++) {
			//http://home.mcom.com/home/images/tiles.gif
			arr.push({src: document.images[i].src});
		}
		xhr.send(JSON.stringify(arr));

		console.log("END");
	}
	}, 10);
});

function handleStateChange() {
	document.images[0].src = 'http://localhost:8080/static/test.jpg';
	console.log("handleStateChange");
}
