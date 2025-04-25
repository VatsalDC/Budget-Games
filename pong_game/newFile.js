window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	var framesPerSecond = 30;
	setInterval(function () {
		moveEverything();
		drawEverything();
	}, 1000 / framesPerSecond);

	// Add keyboard controls
	window.addEventListener("keydown", function (event) {
		switch (event.key) {
			case "ArrowUp":
			case "w":
		}
	});
};
