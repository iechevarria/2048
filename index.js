/* State */

function Square () {
  this.value = 0;
  this.combined = false;
}


var State = {
  size: 4,
  score: 0,
  board: new Array(this.size),

  getSquare: function (i, j) {
    return this.board[i][j];
  },
  
  reset: function () {
    for (var i = 0; i < this.size; i++) {
      this.board[i] = new Array(this.size);
      for (var j = 0; j < this.size; j++) {
        this.board[i][j] = new Square();
      }
    }
  },
  
  print: function () {
    console.log('score: ' + this.score); 
    for (var i = 0; i < this.size; i++) {
      var myStr = '';      
      for (var j = 0; j < this.size; j++) {
        if (this.board[i][j].value != 0) { myStr += this.board[i][j].value + ' '; }
        else { myStr += '. '; }
      }
      console.log(myStr);
    }
  console.log('');
  }
};


var Logic = {
  move: function (direction) {
    for (var pass = 0; pass < State.size - 1; pass++) {
      for (var n = 0; n < State.size; n++) {
        if (direction === 'l') {
          for (var j = 0; j < State.size - 1; j++) {
            this.combine(n, j, 0, 1);
          }
        } else if (direction === 'r') {
          for (var j = State.size - 1; j > 0; j--) {
            this.combine(n, j, 0, -1);
          }
        } else if (direction === 'u') {
          for (var i = 0; i < State.size - 1; i++) {
            this.combine(i, n, 1, 0);
          }
        } else {
          for (var i = State.size - 1; i > 0; i--) {
            this.combine(i, n, -1, 0);
          }
        }
      }
    }
    this.resetCombined();
    this.addSquare();
    State.print();  
    this.validMoveExists();
  },

  combine: function (i, j, di, dj) {
    cur = State.getSquare(i, j);
    adj = State.getSquare(i + di, j + dj);
    if (cur.value === 0) {
      cur.value = adj.value;
      adj.value = 0;
    } else if (cur.value === adj.value && !cur.combined && !adj.combined) {
      cur.value *= 2;
      State.score += cur.value;          
      adj.value = 0;
      cur.combined = true;
    }
  },

  resetCombined: function () {
    for (var i = 0; i < State.size; i++) {
      for (var j = 0; j < State.size; j++) {
        State.getSquare(i, j).combined = false;
      }
    }
  },

  validMoveExists: function () {
    var moveExists = false;
    for (var i = 0; i < State.size - 1; i++) {
      for (var j = 0; j < State.size - 1; j++) {
        if (State.getSquare(i, j).value === 0 || State.getSquare(i + 1, j).value === 0 || State.getSquare(i, j + 1).value === 0 ||
            State.getSquare(i, j).value === State.getSquare(i + 1, j).value ||
            State.getSquare(i, j).value === State.getSquare(i, j + 1).value) 
        {
          moveExists = true;
        }
      }
    }
    if (State.getSquare(State.size - 1, State.size - 1).value === 0 ||
        State.getSquare(State.size - 1, State.size - 1).value === State.getSquare(State.size - 2, State.size - 1).value ||
        State.getSquare(State.size - 1, State.size - 1).value === State.getSquare(State.size - 1, State.size - 2).value)
    {
      moveExists = true;
    }
    return moveExists;
  },

  addSquare: function () {}
};

/* View */

var upPressed = false;
var downPressed = false;

window.onkeydown = function (e) {
  var key = e.keyCode ? e.keyCode : e.which;
  if (key === 37) {
    leftPressed = true;
  } else if (key === 38) {
    upPressed = true;
  } else if (key === 39) {
    rightPressed = true;
  } else if (key === 40) {
    downPressed = true;
  } 
};

window.onkeyup = function (e) {
  var key = e.keyCode ? e.keyCode : e.which;
  if (key == 37 && leftPressed) {
    Logic.move('l');
    leftPressed = false;
  } else if (key === 38 && upPressed) {
    Logic.move('u');
    upPressed = false;
  } else if (key === 39 && rightPressed) {
    Logic.move('r');
    rightPressed = false;
  } else if (key === 40 && downPressed) {
    Logic.move('d');
    downPressed = false;
  }
};


State.reset();
State.getSquare(0, 0).value = 2;
State.getSquare(0, 1).value = 2;
State.getSquare(0, 2).value = 2;
State.getSquare(0, 3).value = 2;
State.getSquare(1, 3).value = 2;
State.getSquare(3, 3).value = 2;
