import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css";
import Modal from "../components/Modal";

function Game() {
  const [closeModal, setCloseModal] = useState(true);

  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const CANVAS_SIZE = 500;
  const SNAKE_SIZE = 20;
  const CANVAS_X = window.innerWidth / 2 - CANVAS_SIZE / 2;
  const CANVAS_Y = window.innerHeight / 2 - CANVAS_SIZE / 2;
  const SNAKE_X = window.innerWidth / 2 - CANVAS_SIZE / 2;
  const SNAKE_Y = window.innerHeight / 2 - CANVAS_SIZE / 2;
  const SQUARE_NUMBER = CANVAS_SIZE / SNAKE_SIZE;
  const SNAKE_SPEED = 5;
  let SCORE = 0;

  class Snake {
    constructor(length, x, y, velocity, color) {
      this.length = length;
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.color = color;
    }

    //creates a red square representing the snake
    drawSnake(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
      ctx.strokeStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }
  }

  class Food {
    constructor(color) {
      this.color = color;
    }

    x = Math.floor(Math.random() * SQUARE_NUMBER) * SNAKE_SIZE + CANVAS_X;
    y = Math.floor(Math.random() * SQUARE_NUMBER) * SNAKE_SIZE + CANVAS_Y;
    drawFood(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
      ctx.strokeStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }
  }

  let myFood = new Food("red");
  let snakes = [];
  snakes.push(new Snake(1, SNAKE_X, SNAKE_Y, { x: 0, y: 1 }, "green"));
  snakes.push(
    new Snake(1, SNAKE_X - SNAKE_SIZE, SNAKE_Y, { x: 0, y: 1 }, "blue")
  );

  let velocity = { x: 1 * SNAKE_SIZE, y: 0 };

  function snakeVelocity(event) {
    switch (event.key) {
      case "a":
        velocity = { x: -1 * SNAKE_SIZE, y: 0 };
        break;
      case "s":
        velocity = { x: 0, y: 1 * SNAKE_SIZE };
        break;
      case "d":
        velocity = { x: 1 * SNAKE_SIZE, y: 0 };
        break;
      case "w":
        velocity = { x: 0, y: -1 * SNAKE_SIZE };
        break;
      default:
        break;
    }
  }

  let delay = 20;
  let count = 0;
  let prev_coords = [];
  function moveSnake(velocity) {
    if (snakes[0].x === CANVAS_X - SNAKE_SIZE) {
      snakes[0].x = CANVAS_X + CANVAS_SIZE - SNAKE_SIZE;
    }
    if (snakes[0].x === CANVAS_X + CANVAS_SIZE) {
      snakes[0].x = CANVAS_X;
    }
    if (snakes[0].y === CANVAS_Y - SNAKE_SIZE) {
      snakes[0].y = CANVAS_Y + CANVAS_SIZE - SNAKE_SIZE;
    }
    if (snakes[0].y === CANVAS_Y + CANVAS_SIZE) {
      snakes[0].y = CANVAS_Y;
    }
    if (delay < count) {
      count = 0;
      snakes.forEach((snake, index) => {
        if (index === 0) {
          prev_coords[index] = { x: snake.x, y: snake.y };
          snake.x += velocity.x;
          snake.y += velocity.y;
        } else {
          prev_coords[index] = { x: snake.x, y: snake.y };
          snake.x = prev_coords[index - 1].x;
          snake.y = prev_coords[index - 1].y;
        }
      });
    }

    //increments the current x/y locations based on snake velocity
    count += 1 * SNAKE_SPEED;
  }

  function foodCheck() {
    snakes.forEach((snake) => {
      if (snake.x === myFood.x && snake.y === myFood.y) {
        myFood.x =
          Math.floor(Math.random() * SQUARE_NUMBER) * SNAKE_SIZE + CANVAS_X;
        myFood.y =
          Math.floor(Math.random() * SQUARE_NUMBER) * SNAKE_SIZE + CANVAS_Y;
        return false;
      }
    });
    return true;
  }

  function updateAnimation() {
    moveSnake(velocity);

    if (snakes[0].x === myFood.x && snakes[0].y === myFood.y) {
      SCORE += 100;
      snakes.push(
        new Snake(1, snakes[1].x, snakes[1].y, { x: 0, y: 1 }, "blue")
      );
      myFood.x =
        Math.floor(Math.random() * SQUARE_NUMBER) * SNAKE_SIZE + CANVAS_X;
      myFood.y =
        Math.floor(Math.random() * SQUARE_NUMBER) * SNAKE_SIZE + CANVAS_Y;

      let loopVar = true;
      let foodCheckVar;
      while (loopVar) {
        foodCheckVar = foodCheck();
        console.log(foodCheckVar);
        if (foodCheckVar === true) {
          loopVar = false;
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", snakeVelocity);

    //creates a context for your canvas that can be used throughout your game
    const canvas1 = canvasRef1.current;
    const ctx1 = canvas1.getContext("2d");
    //creates a second context canvas to add layering effects
    const canvas2 = canvasRef2.current;
    const ctx2 = canvas2.getContext("2d");
    //potential width and height variables that would take up your entire screen
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    let animationId;
    const animate = () => {
      //function used to animate your game over and over
      animationId = requestAnimationFrame(animate);

      //erases the previous canvas
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

      //creates a black canvas
      ctx1.fillStyle = "black";
      ctx1.fillRect(CANVAS_X, CANVAS_Y, CANVAS_SIZE, CANVAS_SIZE);

      ctx1.font = "30px Arial";
      ctx1.fillText(`Score: ${SCORE}`, CANVAS_X + CANVAS_SIZE / 2 - 75, 33);

      snakes.forEach((snake) => {
        snake.drawSnake(ctx1);
      });
      myFood.drawFood(ctx1);

      ctx2.fillStyle = "grey";
      ctx2.fillRect(
        CANVAS_X - SNAKE_SIZE,
        CANVAS_Y - SNAKE_SIZE,
        CANVAS_SIZE + SNAKE_SIZE * 2,
        CANVAS_SIZE + SNAKE_SIZE * 2
      );
      ctx2.clearRect(CANVAS_X, CANVAS_Y, CANVAS_SIZE, CANVAS_SIZE);

      snakes.forEach((snake, index) => {
        if (index === 0) {
        } else {
          if (snakes[0].x === snake.x && snakes[0].y === snake.y) {
            console.log("GAME OVER");
            cancelAnimationFrame(animationId);
            return;
          }
        }
      });

      if (closeModal === false) {
        updateAnimation();
      }

      return () => {
        window.removeEventListener("keydown", snakeVelocity);
      };
    };

    animate();
  }, [closeModal]);

  return (
    <>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: `${CANVAS_X}px`,
          left: `${CANVAS_X - 8}px`,
          zIndex: 2,
        }}
      >
        {closeModal && <Modal closeModal={setCloseModal} />}
      </div>
      <div
        id="game-canvas-1"
        tabIndex="0"
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <canvas
          ref={canvasRef1}
          style={{ position: "absolute", top: "50px", zIndex: 0 }}
        />
        <canvas
          ref={canvasRef2}
          style={{ position: "absolute", top: "50px", zIndex: 1 }}
        />
      </div>
    </>
  );
}

export default Game;
