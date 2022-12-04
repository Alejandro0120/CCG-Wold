const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const modalEl = document.querySelector('#modalEl');
const bigScore = document.querySelector('#bigScore');

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  pintar() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Proyectile {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  pintar() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.pintar();
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  pintar() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.pintar();
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
}

const friction = .98;
class Particula {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.alpha = 1;
  }

  pintar() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.pintar();
    this.speed.x *= friction;
    this.speed.y *= friction;
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
    this.alpha -= .01;
  }
}









const x = canvas.width / 2;
const y = canvas.height / 2;

let player = new Player(x, y, 30, "white");
let proyectiles = [];
let enemigos = [];
let particulas = [];

function init(){
  player = new Player(x, y, 30, "white");
  proyectiles = [];
  enemigos = [];
  particulas = [];
  score = 0;
  scoreEl.innerHTML = score;
  bigScore.innerHTML = score;
}

function spawnEnemigos() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;

    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

    const speed = {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2,
    };

    enemigos.push(new Enemy(x, y, radius, color, speed));
  }, 1000);
}

let animateId;
let score = 0;
function animate() {
  animateId = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.pintar();

  particulas.forEach((particula, index) =>{
    if(particula.alpha <= 0){
      particulas.splice(index, 1);
    }else{
      particula.update();
    }
    
  });

  proyectiles.forEach((proyectile, index) => {
    proyectile.update();

    if (
      proyectile.x + proyectile.radius < 0 ||
      proyectile.x - proyectile.radius > canvas.width ||
      proyectile.y + proyectile.radius < 0 ||
      proyectile.y - proyectile.radius > canvas.height
    ) {
      setTimeout(() => {
        proyectiles.splice(index, 1);
      }, 0);
    }
  });
  enemigos.forEach((enemy, index) => {
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    // end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animateId);
      modalEl.style.display = 'flex';
      bigScore.innerHTML = score;
      console.log(modalEl)
      
    }

    proyectiles.forEach((proyectil, proyectIndex) => {
      const dist = Math.hypot(proyectil.x - enemy.x, proyectil.y - enemy.y);

      //projectil toca enemigo
      if (dist - enemy.radius - proyectil.radius < 1) {

        //incremento puntuacion
        


        //creacion de explosiones
        for(let i = 0; i < enemy.radius * 2; i++){
          particulas.push(new Particula(
            proyectil.x, proyectil.y, 
            Math.random() * 2, enemy.color, {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6)
            })
          );
        }

        if (enemy.radius - 10 > 5) {
          score += 100;
          scoreEl.innerHTML = score;

          gsap.to(enemy, {
            radius: enemy.radius - 10
          });
          enemy.radius -= 10;
          setTimeout(() => {
            proyectiles.splice(proyectIndex, 1);
          }, 0);
        } else {
          score += 250;
          scoreEl.innerHTML = score;
          setTimeout(() => {
            enemigos.splice(index, 1);
            proyectiles.splice(proyectIndex, 1);
          }, 0);
        }

      }
    });
  });
}

addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );

  const speed = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  proyectiles.push(
    new Proyectile(canvas.width / 2, canvas.height / 2, 5, "white", speed)
  );
});

startGameBtn.addEventListener('click', ()=>{
  init();
  animate();
  spawnEnemigos();
  modalEl.style.display = 'none';
})

