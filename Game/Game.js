const canvas = document.querySelector("canvas");

//creates a context for the canvas that we'll use over and over
const c = canvas.getContext("2d");

//sets the canvas width to the width of your current browser
canvas.width = innerWidth;
canvas.height = innerHeight;

//creates a variable to cooresponds with the score shown on the canvas
const scoreEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

//creates a player class with information about the character and a function to draw them on the canvas
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  drawPlayer() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

//creates a projectile class with information about the projectile and a function to drawn them on the canvas and to update their x/y positions
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  drawProjectile() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  //what you want to happen to the player every frame
  update() {
    this.drawProjectile();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//creates an emeny class thats works in the same way as the projectile class
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  drawEnemy() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.drawEnemy();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//how fast the particles slow down
const friction = 0.98;
//creates a particle class thats works in the same way as the projectile class
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  drawParticle() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.drawParticle();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

//keep track of the middle of the game
const x = canvas.width / 2;
const y = canvas.height / 2;

//initializes your player class
let player = new Player(x, y, 10, "white");

//creates arrays to keep track of all of the enemies and projectiles
let projectiles = [];
let enemies = [];
let particles = [];

function init() {
  player = new Player(x, y, 10, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerHTML = score;
  bigScoreEl.innerHTML = score;
}

//spawns enemies every second from random locations on the canvas, with random colors and sizes
function spawnEnemies() {
  setInterval(() => {
    //random enemy size
    const radius = Math.random() * (30 - 4) + 4;
    let x;
    let y;
    //random starting location
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    //random enemy color
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

    //calculates the angle to the player
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    //adds the enemy to the enemy array
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

let score = 0;
//function that initiates the game
let animationId;
function animate() {
  //creates an infinite loop for your game
  animationId = requestAnimationFrame(animate);
  //game background color
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  //draws the player on the canvas
  player.drawPlayer();
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });

  //loops through the projectile array to update their movement and check if they are off the screen
  projectiles.forEach((projectile, index) => {
    projectile.update();

    //remove projectiles when the cross the edge of the screen
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      //makes your frames not look glitchy
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });

  //loops through the enemies array to update their movement and check if they have reached the player
  enemies.forEach((enemy, index) => {
    enemy.update();

    //checks if the enemy has come in contact with the player
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - enemy.radius - player.radius < 1) {
      //stops the animation if yes
      cancelAnimationFrame(animationId);
      modalEl.style.display = "flex";
      bigScoreEl.innerHTML = score;
    }

    //checks if a projectile has it an enemy. removes the enemy and the projectile if yes
    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      //if a projectile touches an enemy
      if (dist - enemy.radius - projectile.radius < 1) {
        //creates 8 little explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 5),
                y: (Math.random() - 0.5) * (Math.random() * 5),
              }
            )
          );
        }

        if (enemy.radius - 10 > 5) {
          //increase the score
          score += 100;
          scoreEl.innerHTML = score;
          //gsap is an outside library to allows you to do smooth transitions, in this case, shrink the enemy before destroying it
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          //increase the score even more
          score += 250;
          scoreEl.innerHTML = score;
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

//event listener looking for clicks that will spawn new projectiles toward the mouse click
addEventListener("click", (event) => {
  //calculate the projectile angle
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  //how fast the projectiles move
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  //add the projectiles to the array
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "white", {
      x: velocity.x,
      y: velocity.y,
    })
  );
});

startGameBtn.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  modalEl.style.display = "none";
});
