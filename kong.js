/**
 * @fileOverview To recreate the Atari-style game of kong, in the browser
 * Inspiration:  https://www.w3schools.com/graphics/game_intro.asp
 * @author Conner Page (cpage@anderson.edu)
 * @date September 2019
 */

/** the right kong paddle object */
let rightPaddle;
/** the barrel object */
let barrel;
/** left edge of screen */
let leftEdge;
/** right edge of screen */
let rightEdge;
/** top edge of screen */
let topEdge;
/** bottom edge of screen */
let bottomEdge;
/** game score */
let score = 0;
/** bounce count */
let bounces = 0;
/** paddleBounceEffect the current max size of the speed change */
let paddleBounceEffect = 1;
/** floor the current ground for Mario to run on */
let floor;
/** jump height to stop double jumping */
let jumpHeight;

/** @const {number} SCREEN_X x dimension of screen */
const SCREEN_X = 480;
/** @const {number} SCREEN_Y y dimension of screen */
const SCREEN_Y = 270;
/** @const {number} OFFSET_X x offset from edge of canvas */
const OFFSET_X = 10;
/** @const {number} PADDLE_WIDTH width of the paddles */
const PADDLE_WIDTH = 10;
/** @const {number} PADDLE_HEIGHT height of the paddles */
const PADDLE_HEIGHT = 15;
/** @const {number} LADDER_WIDTH width of the ladders */
const LADDER_WIDTH = 20;
/** @const {number} LADDER_HEIGHT height of the ladders */
const LADDER_HEIGHT = 55;
/** @const {number} RAIL_WIDTH width of the rails */
const RAIL_WIDTH = 1000;
/** @const {number} RAIL_HEIGHT height of the rails */
const RAIL_HEIGHT = 10;
/** @const {number} barrel_DIM width/height of the square barrel */
const barrel_DIM = 15;
/** @const {number} barrel_SPEED the speed of the barrel */
const barrel_SPEED = 2;
/** @const {number} RANDOM_EFFECT the max size of initial randomness added */
const RANDOM_EFFECT = 4;
/** @const {number} PADDLE_SPEED the speed of the paddle */
const PADDLE_SPEED = 3;
/** @const {number} A_KEY the keycode of the 'a' key */
const A_KEY = 65;
/** @const {number} Z_KEY the keycode of the 'z' key */
const Z_KEY = 90;
/** @const {number} UP_KEY the keycode of the up arrow key */
const UP_KEY = 38;
/** @const {number} DOWN_KEY the keycode of the down arrow key */
const DOWN_KEY = 40;
/** @const {number} DOWN_KEY the keycode of the down arrow key */
const LEFT_KEY = 37;
/** @const {number} DOWN_KEY the keycode of the down arrow key */
const RIGHT_KEY = 39;
/** @const {string} PADDLE_COLORS the colors of the paddles */
const PADDLE_COLORS = "grey";
/** @const {string} barrel_COLOR the color of the ladders */
const LADDER_COLORS = "red";
/** @const {string} RAIL_COLOR the color of the rails */
const RAIL_COLORS = "blue";
/** @const {string} barrel_COLOR the color of the barrel */
const barrel_COLOR = "grey";
/** @CONST {STRING} SCORE_COLOR the color of the score text */
const SCORE_COLOR = "blue";
/** @const {number} BOUNCES_PER_SCORE the number of bounces per point */
const BOUNCES_PER_SCORE = 1;
/** @const {number} BOUNCES_PER_SPEEDUP the number of bounces per speed increase */
const BOUNCES_PER_SPEEDUP = 5;
/** @const {number} SPEED_INCREMENT the amount to speed up each time */
const SPEED_INCREMENT = 0.01;
/** @const {number} Y_ATTENUATOR the fraction to attenuate the y randomness
 * to increase playability by reducing vertical speed */
const Y_ATTENUATOR = 0.25;
/** @type {string} IMAGE If this is an image component, set to "image" */
const IMAGE = "image";
/** @type {string} barrel_IMG The name of the image file for the barrel */
const barrel_IMG = "Barrel.png";
/** @type {string} PADDLE_IMG The name of the image file for the paddle */
const PADDLE_IMG = "mario.png";
/** @type {string} LADDER_IMG The name of the image file for the ladders */
const LADDER_IMG = "ladder.png";

/**
 * Sets up the game canvas and components of the game.
 * Called when the body of the html file is loaded.
 */
function beginGame() {
  kongGame.start();
  startGame();
}
function startGame() {
  // call the function in the kongGame object to initialize the game

  floor = SCREEN_Y;

  // set jumpheight to match floor
  jumpHeight = SCREEN_Y - PADDLE_HEIGHT * 2;

  // right paddle starts right side bottom
  rightPaddle = new Component(
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_IMG,
    PADDLE_WIDTH,
    SCREEN_Y - PADDLE_HEIGHT,
    IMAGE
  );

  // bottom ladder starts right side bottom
  bottomLadder = new Component(
    LADDER_WIDTH,
    LADDER_HEIGHT,
    LADDER_IMG,
    SCREEN_X - OFFSET_X - LADDER_WIDTH,
    SCREEN_Y - LADDER_HEIGHT,
    IMAGE
  );

  // middle ladder starts left side
  middleLadder = new Component(
    LADDER_WIDTH,
    LADDER_HEIGHT,
    LADDER_IMG,
    LADDER_WIDTH,
    SCREEN_Y - LADDER_HEIGHT * 2,
    IMAGE
  );

  // top ladder starts right side top
  topLadder = new Component(
    LADDER_WIDTH,
    LADDER_HEIGHT,
    LADDER_IMG,
    SCREEN_X - LADDER_WIDTH * 6,
    SCREEN_Y - LADDER_HEIGHT * 3,
    IMAGE
  );

  // final ladder starts left side top
  finalLadder = new Component(
    LADDER_WIDTH,
    LADDER_HEIGHT * 2,
    LADDER_IMG,
    2,
    0,
    IMAGE
  );

  // bottom rail starts right side bottom
  bottomRail = new Component(
    RAIL_WIDTH,
    RAIL_HEIGHT,
    RAIL_COLORS,
    SCREEN_X - RAIL_WIDTH,
    SCREEN_Y - LADDER_HEIGHT
  );

  // middle rail starts right side bottom
  middleRail = new Component(
    RAIL_WIDTH,
    RAIL_HEIGHT,
    RAIL_COLORS,
    SCREEN_X - RAIL_WIDTH,
    SCREEN_Y - LADDER_HEIGHT * 2
  );

  // top rail starts right side bottom
  topRail = new Component(
    RAIL_WIDTH,
    RAIL_HEIGHT,
    RAIL_COLORS,
    SCREEN_X - RAIL_WIDTH,
    SCREEN_Y - LADDER_HEIGHT * 3
  );

  // barrel starts in the middle, moving with an initial velocity
  //barrel = new Component(barrel_DIM, barrel_DIM, barrel_COLOR, SCREEN_X/2.0,
  // SCREEN_Y/2.0);
  barrel = new Component(
    barrel_DIM,
    barrel_DIM,
    barrel_IMG,
    400, //1.1 to 19.9
    0,
    IMAGE
  );
  barrel.speedX += -3;
  barrel.speedY += 2.5; // random Y speed

  barrel2 = new Component(
    barrel_DIM,
    barrel_DIM,
    barrel_IMG,
    13, //1.1 to 19.9
    -3440,
    IMAGE
  );
  barrel2.speedX += 5;
  barrel2.speedY += 3; // random Y speed

  // create left and right boundaries, which are not drawn, just used
  // to detect if barrel reaches the edge
  leftEdge = new Component(1, SCREEN_Y, "black", -1, 0);
  rightEdge = new Component(1, SCREEN_Y, "black", SCREEN_X, 0);

  // create top and bottom boundaries, which are not drawn, but
  // used to detect if the barrel bounces off the top/bottom
  topEdge = new Component(SCREEN_X, 1, "black", 0, -1);
  bottomEdge = new Component(SCREEN_X, 1, "black", 0, SCREEN_Y - 1);
}

/**
 * Generate a random number between -1 and 1
 * @return {number} A random number between -1 and 1
 */
function getRandomValue() {
  let randVal = Math.random(); // random number between 0 and 1
  // drop at random speed)
  randVal = -randVal;
  // return the result
  return randVal;
}

/**
 * @class Represents the kong game canvas and actions.
 */
let kongGame = {
  /** the rectangular HTML element that is our game play area */
  canvas: document.createElement("canvas"), // create the canvas

  /**
   * Initializes the elements needed for the game
   */
  start: function() {
    // set the size of canvas
    this.canvas.width = SCREEN_X;
    this.canvas.height = SCREEN_Y;

    // get access to the canvas context, so we can draw on it
    this.context = this.canvas.getContext("2d");
    // insert the canvas into the DOM at the end, after the title
    document.body.insertBefore(this.canvas, document.body.nextSibling);

    // over time, call updateGameArea frequently
    // (50 times per second, every 20 ms)
    this.interval = setInterval(updateGameArea, 20);

    // if the user presses a key, copy the code into the
    // key variable in this class
    // multiple keys are allowed at one time
    window.addEventListener("keydown", function(e) {
      kongGame.keys = kongGame.keys || [];
      kongGame.keys[e.keyCode] = true;
    });

    window.addEventListener("keyup", function(e) {
      kongGame.keys[e.keyCode] = false;
    });
  }, // end of start() function

  /**
   * Clear screen between updates
   */
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  /**
   * Stop the animations (end the game)
   */
  stop: function() {
    clearInterval(this.interval);
    // clear screen
    this.clear();
    // draw end of game message
    let ctx = kongGame.context;
    ctx.font = "42px Arial";
    ctx.fillStyle = PADDLE_COLORS;
    ctx.textAlign = "center";
    // note that string literals use back-single-quotes
    ctx.fillText("Game Over!", SCREEN_X / 2, SCREEN_Y / 2);
    ctx.fillText(`Score ${score}`, SCREEN_X / 2, SCREEN_Y / 2 + 42);
    crash = false;
    return crash;
  }
}; // the kongGame class

/**
 * @class Represents rectangular shaped component such as a paddle or barrel,
 * which can draw itself (update()), move itself (newPos()), and detect a
 * collision with other Components (collidesWith()).
 * @param {number} width The width of the rectangle
 * @param {number} height The height of the rectangle
 * @param {string} color The color to fill the rectangle, or the name of the
 * image file
 * @param {number} x The initial x position of the upper left corner
 * @param {number} y The initial y position of the upper left corner
 * @param {string} type The type of the component (image or rectangle),
 * default is rectangle
 */
function Component(width, height, color, x, y, type = "rectangle") {
  /** @type {number} width The width of this component */
  this.width = width;
  /** @type {number} height The height of this component */
  this.height = height;
  /** @type {number} x The x position of top left edge */
  this.x = x;
  /** @type {number} y The y position of the top left edge */
  this.y = y;
  /* @type {number} speedX The x speed that it is moving */
  this.speedX = 0;
  /** @type {number} speedY The y speed that it is moving */
  this.speedY = 0;
  /** @type {string} type The type of the component (image or rectangle) */
  this.type = type;

  // if it is an image, load the image
  if (type === "image") {
    this.image = new Image();
    this.image.src = color;
  }

  /**
   * Update this rectangular object by redrawing it at it's current position
   */
  this.update = function() {
    /** @type {CanvasRenderingContext2D | WebGLRenderingContext | *}
     *        the canvas representing the game board
     */
    let ctx = kongGame.context; // get access to the canvas
    // if it is an image...
    if (type === "image") {
      // draw the image
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      // draw a rectangle
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  /**
   * Change the position, passed on the speed:  x = x0 + vo t + 0.5 a t^2
   * where t = 1 time tick, and a = 0 (or velocity is changed manually)
   */
  this.newPos = function() {
    // move the object's position
    this.x += this.speedX;
    this.y += this.speedY;

    // see if reached top or bottom edges of screen
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > SCREEN_Y - this.height) {
      // bottom edge
      this.y = SCREEN_Y - this.height;
    }
  };

  /**
   * Change the position, passed on the speed:  x = x0 + vo t + 0.5 a t^2
   * where t = 1 time tick, and a = 0 (or velocity is changed manually)
   */
  this.jump = function() {
    // move the object's position
    this.x += this.speedX;
    this.y += this.speedY;
    // see if reached top or bottom edges of screen or hits ladders
    if (this.y == PADDLE_HEIGHT) {
      this.y = ScreenY;
      score += 1000;
    } else if (
      // See if trying to use a ladder
      rightPaddle.collidesWith(bottomLadder) ||
      rightPaddle.collidesWith(middleLadder) ||
      rightPaddle.collidesWith(topLadder)
    ) {
      // move character location
      this.y -= LADDER_HEIGHT * 0.11;
      // move where character walks
      floor -= LADDER_HEIGHT * 0.11;
      // change jump height
      jumpHeight -= LADDER_HEIGHT * 0.11;
    } else if (
      // See if trying to use final ladder
      rightPaddle.collidesWith(finalLadder)
    ) {
      // add points to score board
      score += 1000;
      // update scoreboard
      drawScore();
      // reset character
      startGame();
    } else if (this.y < jumpHeight) {
      // dont let character fly
      this.y = jumpHeight;
    } else if (this.y > floor - this.height) {
      // bottom edge
      this.y = floor - this.height;
    } else if (this.X < 0) {
      // left edge
      this.x = 0;
    } else if (this.X > SCREEN_X) {
      // Right edge
      this.x = SCREEN_X;
    }
  };

  /**
   * Collision detection between two objects -- do they touch?
   * @param otherObj The other object to determine if they overlap
   * @returns {boolean} True if the two objects collide.
   */
  this.collidesWith = function(otherObj) {
    // where are this object's edges?
    /** @type {number} myLeft The left edge of this object */
    let myLeft = this.x;
    /** @type {number} myRight The right edge of this object */
    let myRight = this.x + this.width;
    /** @type {number} myTop The top edge of this object */
    let myTop = this.y;
    /** @type {number} myBottom The bottom edge of this object */
    let myBottom = this.y + this.height;

    // where are the other object's edges?
    /** @type {number} otherLeft The left edge of the other object */
    let otherLeft = otherObj.x;
    /** @type {number} otherRight The right edge of the other object */
    let otherRight = otherObj.x + otherObj.width;
    /** @type {number} otherTop The top edge of the other object */
    let otherTop = otherObj.y;
    /** @type {number} otherBottom The bottom edge of the other object */
    let otherBottom = otherObj.y + otherObj.height;

    // do they overlap?
    let crash = true;
    if (
      myBottom < otherTop ||
      myTop > otherBottom ||
      myRight < otherLeft ||
      myLeft > otherRight
    ) {
      crash = false;
    }

    // true if overlap (collide), false otherwise
    return crash;
  };

  /**
   * Reverse direction, as if it is bouncing off a paddle.
   */
  this.paddle_bounce = function() {
    // reverse directions in X
    this.speedX = 0 - this.speedX;
  };

  /**
   * Reverse y direction, as if it is bouncing off the top/bottom.
   */
  this.wall_bounce = function() {
    // reverse the y speed
    // if it was going down (positive speed) it will now be
    // going up (negative speed), and vice versa
    this.speedY = 0 - this.speedY;
    // back the barrel away from the wall
    // if speed WAS negative (moving towards top wall), the speed will
    // be positive now, and we want to move it down, so just add it
    // if the speed WAS positive (moving towards bottom wall), the
    // the speed is now negative, so add it to move up.
    this.y += this.speedY;
  };
}

/**
 * Redraw the game area every few milliseconds
 */
function updateGameArea() {
  // clear screen
  kongGame.clear();

  // Draw score
  drawScore();

  // Draw bottom ladder
  drawLadder(bottomLadder);

  // Draw middle ladder
  drawLadder(middleLadder);

  // Draw top ladder
  drawLadder(topLadder);

  // Draw final ladder
  drawLadder(finalLadder);

  // Draw bottom rail
  drawLadder(bottomRail);

  // Draw middle rail
  drawLadder(middleRail);

  // Draw top rail
  drawLadder(topRail);

  // Move the right paddle
  movePaddle(rightPaddle, UP_KEY, LEFT_KEY, RIGHT_KEY);

  // Move the barrel
  movebarrel();
}

/**
 * Draw the score on the Canvas
 */
function drawScore() {
  let ctx = kongGame.context;
  ctx.font = "24px Arial";
  ctx.fillStyle = SCORE_COLOR;
  ctx.textAlign = "center";
  // note that string literals use back-single-quotes
  ctx.fillText(`Score ${score}`, SCREEN_X / 2, 30);
}

/**
 * Handle the movement of the paddle.
 * @param thisPaddle Which paddle to move
 * @param thisKeyUp Which key means "move paddle up"
 * @param thisKeyDown Which key means "move paddle down"
 * @param thisKeyUp
 */
function movePaddle(thisPaddle, thisKeyUp, thisKeyLeft, thisKeyRight) {
  // first, stop the paddle by default
  thisPaddle.speedX = 0;
  thisPaddle.speedY = 0;

  // if the user presses the u keys
  // (keycodes can be found at http://keycode.info/)
  if (kongGame.keys && kongGame.keys[thisKeyUp]) {
    thisPaddle.speedY = -4;
    thisPaddle.jump(); // move it
    thisPaddle.update(); // draw it
    setTimeout(function() {
      thisPaddle.speedY = 4;
      thisPaddle.jump();
      thisPaddle.jump();
    }, 300);
    thisPaddle.update(); // draw it
  }
  // user presses left key
  if (kongGame.keys && kongGame.keys[thisKeyLeft]) {
    if (thisPaddle.x < 0) {
      // left edge
      thisPaddle.speedX = 0;
    } else {
      // move left
      thisPaddle.speedX = -3;
    }
  }
  // user presses right key
  if (kongGame.keys && kongGame.keys[thisKeyRight]) {
    if (thisPaddle.x > SCREEN_X - PADDLE_WIDTH) {
      // right edge
      thisPaddle.speedX = 0;
    } else {
      // move right
      thisPaddle.speedX = 3;
    }
  }
  thisPaddle.newPos(); // move it
  thisPaddle.update(); // draw it
}

/**
 * Handle the drawing of the ladders.
 */
function drawLadder(thisLadder) {
  thisLadder.newPos(); // move it
  thisLadder.update(); // draw it
}
/**
 * Handle the movement of the barrel (including bounces)
 */
function movebarrel() {
  // see if we had collisions, or can just redraw
  if (rightPaddle.collidesWith(barrel)) {
    // detect if two objects crashed together
    // if we had a collision, paddle_bounce
    kongGame.stop();
    // make adjustments to the score and barrel speed after a bounce
  } else if (rightPaddle.collidesWith(barrel2)) {
    // detect if two objects crashed together
    // if we had a collision, paddle_bounce
    kongGame.stop();
    // make adjustments to the score and barrel speed after a bounce
  } else if (barrel.collidesWith(topEdge) || barrel.collidesWith(bottomEdge)) {
    // if the barrel hits the top or bottom edge
    barrel.wall_bounce();
  } else if (
    barrel2.collidesWith(topEdge) ||
    barrel2.collidesWith(bottomEdge)
  ) {
    // if the barrel hits the top or bottom edge
    barrel2.wall_bounce();
  } else if (barrel.collidesWith(leftEdge) || barrel.collidesWith(rightEdge)) {
    // detect if two objects crashed together
    // if we had a collision, paddle_bounce
    barrel.paddle_bounce();
  } else if (
    barrel2.collidesWith(leftEdge) ||
    barrel2.collidesWith(rightEdge)
  ) {
    // detect if two objects crashed together
    // if we had a collision, paddle_bounce
    barrel2.paddle_bounce();
  }
  // redraw the barrel
  barrel.newPos(); // move it
  barrel.update(); // draw it
  // redraw the barrel2
  barrel2.newPos(); // move it
  barrel2.update(); // draw it
}
