const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;
const width = canvasSize * box;
const height = canvasSize * box;
const scoreElement = document.getElementById('score');

let score = 0;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Word to be displayed in the snake body
const phrase = "Art Hotel Groups";
let collectedLetters = ""; // Will hold the collected letters as the snake eats

// Randomly position the food and assign a letter from the phrase
let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box,
    letter: phrase[collectedLetters.length % phrase.length] // Get the next letter in the phrase
};

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Check if the snake collides with itself
function collision(newHead, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (newHead.x == snakeArray[i].x && newHead.y == snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

// Draw the game with letters inside the snake and circular food
function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw the snake with letters inside the body
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#1abc9c" : "#2ecc71"; // Snake head and body with different colors
        ctx.beginPath();
        ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#27ae60";
        ctx.stroke();

        // Display letters inside the snake body
        if (i < collectedLetters.length) {
            ctx.fillStyle = "#fff";
            ctx.font = "15px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(collectedLetters[i], snake[i].x + box / 2, snake[i].y + box / 2);
        }
    }

    // Draw the circular food with the letter
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw the letter on the food
    ctx.fillStyle = "#fff";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(food.letter, food.x + box / 2, food.y + box / 2);

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    // Check if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreElement.innerHTML = score;
        
        // Add the food's letter to the collectedLetters string
        collectedLetters += food.letter;

        // Generate new food and assign the next letter in the phrase
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box,
            letter: phrase[collectedLetters.length % phrase.length]
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= width ||
        snakeY >= height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 100);

function restartGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    score = 0;
    scoreElement.innerHTML = score;
    collectedLetters = ""; // Reset collected letters
    d = null;
    food = {
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box,
        letter: phrase[collectedLetters.length % phrase.length]
    };
    clearInterval(game);
    game = setInterval(draw, 100);
}
