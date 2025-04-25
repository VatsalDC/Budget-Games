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
var lastPaddle1Y = paddle1Y;
var lastPaddle2Y = paddle2Y;
var paddle1Speed = paddle1Y - lastPaddle1Y;
var paddle2Speed = paddle2Y - lastPaddle2Y;
lastPaddle1Y = paddle1Y;
lastPaddle2Y = paddle2Y;
var powerUpActive = false;
var powerUpTimer = 0;

// Variables to keep track of which keys are being pressed
var upPressed = false;
var downPressed = false;
var touchY;

function handleTouchStart(evt) {
	evt.preventDefault();
	var touch = evt.touches[0];
	paddle1Y = touch.clientY - PADDLE_HEIGHT / 2;
}

function handleTouchMove(evt) {
	evt.preventDefault();
	var touch = evt.touches[0];
	var deltaY = touch.clientY - touchY;

	// Move the paddle based on the touch movement
	if (deltaY < 0 && paddle1Y > 0) {
		paddle1Y -= paddleSpeed;
	}
	if (deltaY > 0 && paddle1Y < canvas.height - PADDLE_HEIGHT) {
		paddle1Y += paddleSpeed;
	}

	touchY = touch.clientY;
}

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	document.getElementById("startButton").addEventListener("click", startGame);
	document
		.getElementById("restartButton")
		.addEventListener("click", restartGame);

	document.getElementById("quitButton").addEventListener("click", quitGame);
};

function quitGame() {
	gameStarted = false;
	gamePaused = true;
	alert("You have quit the game.");
}

function restartGame() {
	player1Score = 0;
	player2Score = 0;
	document.getElementById("player1Score").textContent = "0";
	document.getElementById("player2Score").textContent = "0";
	ballSpeedX = Math.random() < 0.5 ? 8 : -8; // Reset ball speed X
	ballSpeedY = Math.random() < 0.5 ? 4 : -4; // Reset ball speed Y
	paddleSpeed = 10; // Reset paddle speed
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
		case "w":
			upPressed = true;
			break;
		case "ArrowDown":
		case "s":
			downPressed = true;
			break;
	}
});

window.addEventListener("keyup", function (event) {
	switch (event.key) {
		case "ArrowUp":
		case "w":
			upPressed = false;
			break;
		case "ArrowDown":
		case "s":
			downPressed = false;
			break;
	}
});

function moveEverything() {
	if (gameStarted && !gamePaused) {
		// Move the paddle based on which keys are being pressed
		if (upPressed && paddle1Y > 0) {
			paddle1Y -= paddleSpeed;
		}
		if (downPressed && paddle1Y < canvas.height - PADDLE_HEIGHT) {
			paddle1Y += paddleSpeed;
		}

		ballX += ballSpeedX;
		ballY += ballSpeedY;

		// AI for right paddle
		if (Math.random() < 0.83) {
			// 92% chance to move
			if (ballY < paddle2Y) {
				paddle2Y -= paddleSpeed;
			} else if (ballY > paddle2Y + PADDLE_HEIGHT) {
				paddle2Y += paddleSpeed;
			}
		}
		// Add an event listener for mouse movement
		canvas.addEventListener("mousemove", function (evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - PADDLE_HEIGHT / 2; // This will center the paddle to the mouse position
		});
	}

	// Function to calculate mouse position
	function calculateMousePos(evt) {
		var rect = canvas.getBoundingClientRect(),
			root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;

		return {
			x: mouseX,
			y: mouseY,
		};
	}

	if (ballX - 7 < 0) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
			document.getElementById("paddleHitSound").play();
			ballSpeedX = -ballSpeedX;
			ballSpeedY += paddle1Speed;
			if (Math.abs(ballSpeedX) < 23) {
				ballSpeedX *= 1.05; // Increase speed by 10%
				ballSpeedY *= 1.1; // Increase speed by 10.5%
				paddleSpeed *= 1.025; // Increase paddle speed by 9.5%
			}
		} else {
			player2Score++; // Increase player 2 score
			document.getElementById("player2Score").textContent =
				"" + player2Score; // Update player 2 score in HTML
			ballReset();
		}
	}
	if (ballX + 7 > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
			document.getElementById("paddleHitSound").play();
			ballSpeedX = -ballSpeedX;
			ballSpeedY += paddle2Speed;
			if (Math.abs(ballSpeedX) < 23) {
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
	if (ballY - 7 < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY + 7 > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	if (
		ballX > 50 / 2 - 5 &&
		ballX < 50 / 2 + 5 &&
		ballY > 20 / 2 - 5 &&
		ballY < 20 / 2 + 5
	) {
		powerUpActive = true;
		powerUpTimer = 10;
	}
	if (powerUpActive) {
		PADDLE_HEIGHT = 200; // Increase the size of the paddle
		powerUpTimer--;
		if (powerUpTimer <= 0) {
			powerUpActive = false;
			PADDLE_HEIGHT = 100; // Reset the size of the paddle
		}
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
	if (powerUpActive) {
		//to display power up timer
		canvasContext.fillText("Power-up: " + powerUpTimer, 50 / 2, 25);
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
