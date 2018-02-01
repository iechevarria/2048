/* State */

function Square () {
  this.value = 0;
  this.combined = false;
}


function Board (size) {
  this.size = size;
  this.arr = new Array(size);
  for (var i = 0; i < size; i++) {
    this.arr[i] = new Array(size);
    for (var j = 0; j < size; j++) {
      this.arr[i][j] = new Square();
    }
  }
}

Board.prototype.copy = function (board) {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      this.arr[i][j].value = board.getValue(i, j);
    }
  }
}

Board.prototype.getSquare = function (i, j) {
  return this.arr[i][j];
}

Board.prototype.getValue = function (i, j) {
  return this.arr[i][j].value;
}

Board.prototype.setValue = function (i, j, val) {
  this.arr[i][j].value = val;
}

Board.prototype.equals = function (board) {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      if (this.getValue(i, j) != board.getValue(i, j)) { return false; }
    }
  }
  return true;
}


var State = {
  size: 4,
  score: 0,

  reset: function () {
     this.board = new Board(this.size);
  },

  getSquare: function (i, j) {
    return this.board.getSquare(i, j);
  },

  getValue: function (i, j) {
    return this.board.getValue(i, j);
  },

  setValue: function (i, j, val) {
    this.board.setValue(i, j, val);
  },
    
  print: function () {
    console.log('score: ' + this.score); 
    for (var i = 0; i < this.size; i++) {
      var myStr = '';      
      for (var j = 0; j < this.size; j++) {
        if (this.getValue(i, j) != 0) { myStr += this.getValue(i, j) + ' '; }
        else { myStr += '. '; }
      }
      console.log(myStr);
    }
  console.log('');
  }
};


var Logic = {
  step: function (direction) {
    tmp = new Board(State.size);
    tmp.copy(State.board);
    State.score += this.move(direction, State.board);
    if (!tmp.equals(State.board)) {
      this.addSquare();
      State.print();  
      if (!this.validMoveExists()) { State.reset(); }
      return true;
    }
    return false;
  },

  move: function (direction, board) {
    score = 0;
    for (var pass = 0; pass < State.size - 1; pass++) {
      for (var n = 0; n < State.size; n++) {
        if (direction === 'l') {
          for (var j = 0; j < State.size - 1; j++) {
            score += this.combine(n, j, 0, 1, board);
          }
        } else if (direction === 'r') {
          for (var j = State.size - 1; j > 0; j--) {
            score += this.combine(n, j, 0, -1, board);
          }
        } else if (direction === 'u') {
          for (var i = 0; i < State.size - 1; i++) {
            score += this.combine(i, n, 1, 0, board);
          }
        } else {
          for (var i = State.size - 1; i > 0; i--) {
            score += this.combine(i, n, -1, 0, board);
          }
        }
      }
    }
    this.resetCombined();
    return score;
  },

  combine: function (i, j, di, dj, board) {
    score = 0;
    cur = board.getSquare(i, j);
    adj = board.getSquare(i + di, j + dj);
    if (cur.value === 0) {
      cur.value = adj.value;
      adj.value = 0;
    } else if (cur.value === adj.value && !cur.combined && !adj.combined) {
      cur.value *= 2;
      score += cur.value; 
      adj.value = 0;
      cur.combined = true;
    } 
    return score;
  },

  resetCombined: function () {
    for (var i = 0; i < State.size; i++) {
      for (var j = 0; j < State.size; j++) {
        State.getSquare(i, j).combined = false;
      }
    }
  },

  validMoveExists: function () {
    tmp1 = new Board(State.size);
    tmp2 = new Board(State.size);
    tmp1.copy(State.board);
    tmp2.copy(State.board);
    this.move('l', tmp1);
    this.move('u', tmp1);
    this.move('r', tmp1);
    this.move('d', tmp1);
    return !tmp1.equals(tmp2);
  },

  addSquare: function () {
    filled = false;
    ct = 0;
    while (!filled && ct < 10000) {
      var i = Math.floor(Math.random() * State.size);
      var j = Math.floor(Math.random() * State.size);
      if (State.getValue(i, j) === 0) {
        if (Math.random() < 0.75) {
          State.setValue(i, j, 2);
        } else {
          State.setValue(i, j, 4);
        }
        filled = true;
      }
      ct ++;
    }
  }
};


/* View */

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

window.onkeydown = function (e) {
  var key = e.keyCode ? e.keyCode : e.which;
  if (key === 37 && !leftPressed) {
    update = Logic.step('l');
    leftPressed = true;
  } else if (key === 38 && !upPressed) {
    update = Logic.step('u');
    upPressed = true;
  } else if (key === 39 && !rightPressed) {
    update = Logic.step('r');
    rightPressed = true;
  } else if (key === 40 && !downPressed) {
    update = Logic.step('d');
    downPressed = true;
  } 
};

window.onkeyup = function (e) {
  var key = e.keyCode ? e.keyCode : e.which;
  if (key == 37) { leftPressed = false; } 
  else if (key === 38) { upPressed = false; } 
  else if (key === 39) { rightPressed = false; } 
  else if (key === 40) { downPressed = false; }
};

State.reset();
State.setValue(1, 1, 2);
State.print();
