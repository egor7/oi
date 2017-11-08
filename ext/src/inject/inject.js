chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		console.log("BEG");

		console.log(document.images[0].src);

		fetch(document.images[0].src).then(function(response) {
			if(response.ok) {
				return response.blob();
			}
			throw new Error('Network response was not ok.');
		}).then(function(myBlob) {
			//var objectURL = URL.createObjectURL(myBlob);
			var object = myBlob;

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = handleStateChange;
			xhr.open("POST", "https://localhost:443", true);
			//var arr = [];
			//for (i = 0; i < document.images.length; i++) {
			//	//http://home.mcom.com/home/images/tiles.gif
			//	arr.push({src: document.images[i].src});
			//}
			//xhr.send(JSON.stringify(arr));
			xhr.send(object);
			console.log(object);
		}).catch(function(error) {
			console.log('There has been a problem with your fetch operation: ' + error.message);
		});

		console.log("END");
	}
	}, 10);
});

function handleStateChange() {
	// document.images[0].src = 'http://localhost:8080/static/test.jpg';
	console.log("handleStateChange");
}
