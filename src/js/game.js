var raf = require('raf');
var modulus = require('./helpers/modulus');
var inverseDirection = require('./helpers/inverse-directions');
var getCommand = require('./helpers/commands');
var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');

var game = {
  score: 0,
  fps: 8,
  over: true,
  message: 'PRESS SPACE TO START THE GAME',

  start: function() {
    this.over = false;
    this.message = null;
    this.score = 0;
    this.fps = 8;
    snake.init();
    food.set();
  },

  stop: function() {
    this.over = true;
    this.message = 'GAME OVER - PRESS SPACEBAR';
  },

  drawBox: function(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x - (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y + (size / 2));
    context.lineTo(x - (size / 2), y + (size / 2));
    context.closePath();
    context.fill();
  },

  drawScore: function() {
    context.fillStyle = '#333';
    context.font = (canvas.height) + 'px Impact, sans-serif';
    context.textAlign = 'center';
    context.fillText(this.score, canvas.width / 2, canvas.height * 0.9);
  },

  drawMessage: function() {
    if (game.message) {
      context.fillStyle = '#F0F';
      context.strokeStyle = '#999';
      context.font = (canvas.height / 10) + 'px Impact';
      context.textAlign = 'center';
      context.fillText(this.message, canvas.width / 2, canvas.height / 2);
      context.strokeText(this.message, canvas.width / 2, canvas.height / 2);
    }
  },

  resetCanvas: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
};

var snake = {
  size: canvas.width / 40,
  x: null,
  y: null,
  color: '#FD0',
  direction: 'left',
  canMove: false,
  sections: [],

  init: function() {
    this.sections = [];
    this.direction = 'left';
    this.x = canvas.width / 2 + this.size / 2;
    this.y = canvas.height / 2 + this.size / 2;

    for (var i = this.x + (5 * this.size); i >= this.x; i -= this.size) {
      this.sections.push(i + ',' + this.y);
    }
  },

  move: function() {
    switch (this.direction) {
      case 'up':
        this.y -= this.size;
        break;
      case 'down':
        this.y += this.size;
        break;
      case 'left':
        this.x -= this.size;
        break;
      case 'right':
        this.x += this.size;
        break;
    }
    this.wrap();
    this.checkCollision();
    this.checkGrowth();
    this.sections.push(this.x + ',' + this.y);
    this.canMove = true;
  },

  wrap: function() {
    this.x = modulus(this.x, canvas.width);
    this.y = modulus(this.y, canvas.height);
  },

  clamp: function() {
    if (this.x >= canvas.width) this.x = canvas.width;
    if (this.x <= 0) this.x = 0;
    if (this.y >= canvas.height) this.y = canvas.height;
    if (this.y <= 0) this.y = 0;
  },

  draw: function() {
    this.sections.forEach(function(section) {
      this.drawSection.apply(this, section.split(','));
    }.bind(this));
  },

  drawSection: function(sectionX, sectionY) {
    game.drawBox(+sectionX, +sectionY, this.size, this.color);
  },

  checkCollision: function() {
    if (this.isColliding()) {
      game.stop();
    }
  },

  isColliding: function() {
    var position = [this.x, this.y].join(',');
    return !!~this.sections.indexOf(position);
  },

  checkGrowth: function() {
    if (
      this.x == food.x &&
      this.y == food.y
    ) {
      game.score++;
      if (
        game.score % 5 == 0 &&
        game.fps < 60
      ) {
        game.fps++;
      }
      food.set();
    } else {
      this.sections.shift();
    }
  }
};

var food = {
  size: null,
  x: null,
  y: null,
  color: '#0FF',

  set: function() {
    this.size = snake.size;
    this.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
    this.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
  },

  draw: function() {
    game.drawBox(this.x, this.y, this.size, this.color);
  }
};

function loop() {
  if (!game.over) {
    game.resetCanvas();
    game.drawScore();
    snake.move();
    food.draw();
    snake.draw();
  }
  game.drawMessage();

  setTimeout(function() {
    raf(loop);
  }, 1000 / game.fps);
}

function initControls() {
  var command;

  addEventListener('keydown', function(e) {
    command = getCommand(e.keyCode);

    if (!!~['up', 'down', 'left', 'right'].indexOf(command) &&
      command != inverseDirection[snake.direction] &&
      snake.canMove
    ) {
      snake.direction = command;
      snake.canMove = false;
    } else if (
      ['start_game'].indexOf(command) >= 0 &&
      game.over
    ) {
      game.start();
    }

    return false;
  }, false);
}

(function() {
  initControls();
  raf(loop);
}());
