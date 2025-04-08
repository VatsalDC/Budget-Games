var canvas;
var canvasContext;
var ballX = 355;
var ballY = 100;
var ballSpeedX = Math.random() < 0.5 ? 7 : -7; // Random initial speed for X
var ballSpeedY = Math.random() < 0.5 ? 7 : -7; // Random initial speed for Y
var paddle1Y = 250;
var paddle2Y = 250;
var paddleSpeed = 8; // Variable paddle speed
const PADDLE_THICKNESS = 5; // Add this line
const PADDLE_HEIGHT = 100; // Add this line
var gameStarted = false;
var gamePaused = false;
var player1Score = 0;
var player2Score = 0;
var wPressed = false;
var sPressed = false;
var upPressed = false;
var downPressed = false; // Variables to keep track of which keys are being pressed
var startButton = document.getElementById("startButton");
var gameMuted = false;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	document.getElementById("startButton").addEventListener("click", startGame);
	document
		.getElementById("restartButton")
		.addEventListener("click", restartGame);

	document.getElementById("quitButton").addEventListener("click", quitGame);
	document
		.getElementById("volumeSlider")
		.addEventListener("input", adjustVolume);
};

function adjustVolume() {
	var volume = document.getElementById("volumeSlider").value;
	document.getElementById("paddleHitSound").volume = volume;
}

function muteGame() {
	gameMuted = !gameMuted;
	document.getElementById("muteButton").textContent = gameMuted
		? "Unmute Game"
		: "Mute Game";
}

function quitGame() {
	gameStarted = false;
	gamePaused = true;
	alert(
		"You have quit the game. Refresh the page to start playing the game AGAIN!"
	);
}

function restartGame() {
	player1Score = 0;
	player2Score = 0;
	document.getElementById("player1Score").textContent = "0";
	document.getElementById("player2Score").textContent = "0";
	ballReset();
	startGame();
}

function startGame() {
	gameStarted = false;
	countdown = 3;
	document.getElementById("countdown").textContent = "0";
	setTimeout(function () {
		countdown--;
		gameStarted = true;
	}, 1000);
	setTimeout(function () {
		countdown--;
	}, 2000);
	setTimeout(function () {
		countdown--;
	}, 3000);
	// 3 second delay before the game starts

	var framesPerSecond = 30;
	setInterval(function () {
		moveEverything();
		drawEverything();
	}, 1000 / framesPerSecond);
	document.getElementById("pauseButton").addEventListener("click", pauseGame);
	startButton.disabled = true;
}

function pauseGame() {
	gamePaused = !gamePaused;
	document.getElementById("pauseButton").textContent = gamePaused
		? "Resume Game"
		: "Pause Game";
}
// Add keyboard controls
window.addEventListener("keydown", function (event) {
	switch (event.key) {
		case "ArrowUp":
			upPressed = true;
			break;
		case "ArrowDown":
			downPressed = true;
			break;
		case "w":
			wPressed = true;
			break;
		case "s":
			sPressed = true;
			break;
	}
});

window.addEventListener("keyup", function (event) {
	switch (event.key) {
		case "ArrowUp":
			upPressed = false;
			break;
		case "ArrowDown":
			downPressed = false;
			break;
		case "w":
			wPressed = false;
			break;
		case "s":
			sPressed = false;
			break;
	}
});

function moveEverything() {
	if (gameStarted && !gamePaused) {
		// Move the left paddle based on which keys are being pressed
		if (wPressed && paddle1Y > 0) {
			paddle1Y -= paddleSpeed;
		}
		if (sPressed && paddle1Y < canvas.height - PADDLE_HEIGHT) {
			paddle1Y += paddleSpeed;
		}

		ballX += ballSpeedX;
		ballY += ballSpeedY;

		// Move the left paddle based on which keys are being pressed
		if (upPressed && paddle2Y > 0) {
			paddle2Y -= paddleSpeed;
		}
		if (downPressed && paddle2Y < canvas.height - PADDLE_HEIGHT) {
			paddle2Y += paddleSpeed;
		}
	}
	if (ballX < 0) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
			document.getElementById("paddleHitSound").play();
			ballSpeedX = -ballSpeedX;
			if (Math.abs(ballSpeedX) < 15) {
				ballSpeedX *= 1.05; // Increase speed by 10%
				ballSpeedY *= 1.1; // Increase speed by 10.5%
				paddleSpeed *= 1.025; // Increase paddle speed by 9.5%
			}
			if (!gameMuted) {
				document.getElementById("paddleHitSound").play();
			}
		} else {
			player2Score++; // Increase player 2 score
			document.getElementById("player2Score").textContent =
				"" + player2Score; // Update player 2 score in HTML
			ballReset();
		}
	}
	if (ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
			document.getElementById("paddleHitSound").play();
			ballSpeedX = -ballSpeedX;
			if (Math.abs(ballSpeedX) < 15) {
				ballSpeedX *= 1.05; // Increase speed by 10%
				ballSpeedY *= 1.1; // Increase speed by 10.5%
				paddleSpeed *= 1.025; // Increase paddle speed by 9.5%
			}
		} else {
			player1Score++; // Increase player 1 score
			document.getElementById("player1Score").textContent =
				"" + player1Score; // Update player 1 score in HTML
			ballReset();
		}
	}
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function ballReset() {
	ballSpeedX = Math.random() < 0.5 ? 8 : -8; // Random speed for X after reset
	ballSpeedY = Math.random() < 0.5 ? 4 : -4; // Random speed for Y after reset
	paddleSpeed = 10; // Reset paddle speed
	ballX = canvas.width / 3;
	ballY = canvas.height / 6;
	gameStarted = false;
	setTimeout(function () {
		countdown--;
		gameStarted = true;
	}, 1000);
	setTimeout(function () {
		countdown--;
	}, 2000);
	setTimeout(function () {
		countdown--;
	}, 3000); // 3 second delay before the game restarts
}

function drawEverything() {
	// Blank out the screen with black
	colorRect(0, 0, canvas.width, canvas.height, "black");

	// Draw the paddles
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
	colorRect(
		canvas.width - PADDLE_THICKNESS,
		paddle2Y,
		PADDLE_THICKNESS,
		PADDLE_HEIGHT,
		"white"
	);

	// Draw the ball
	colorCircle(ballX, ballY, 7, "green");
	if (!gameStarted) {
		canvasContext.fillText(countdown, canvas.width / 2, canvas.height / 2);
	}
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
