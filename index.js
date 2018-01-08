/* State */

function Square () {
  this.value = 0;
  this.combined = false;
}

var State = {
  height: 4,
  width: 4,
  score: 0,
  board: new Array(this.height),
  getSquare: function (i, j) {
    return this.board[i][j];
  },
  reset: function () {
    for (var i = 0; i < this.height; i++) {
      this.board[i] = new Array(4);
      for (var j = 0; j < this.width; j++) {
        this.board[i][j] = new Square();
      }
    }
  },
  print: function () {
    console.log('score: ' + this.score); 
    for (var i = 0; i < this.height; i++) {
      var myStr = '';      
      for (var j = 0; j < this.width; j++) {
        if (this.board[i][j].value != 0) { myStr += this.board[i][j].value + ' '; }
        else { myStr += '. '; }
      }
      console.log(myStr);
    }
  console.log('');
  }
};


/* Logic */

function move (direction) {
  if (direction === 'l') { moveLeft(); }
  else if (direction === 'r') { moveRight(); }
  else if (direction === 'u') { moveUp(); }
  else if (direction === 'd') { moveDown();}
  resetCombined();
}

function moveRight () {
  for (var pass = 0; pass < State.width - 1; pass++) {
    for (var i = 0; i < State.height; i++) {
      for (var j = State.width - 1; j > 0; j--) {
        mv(i, j, 0, -1);
      }
    }
  }
}

function moveLeft () {
  for (var pass = 0; pass < State.width - 1; pass++) {
    for (var i = 0; i < State.height; i++) {
      for (var j = 0; j < State.width - 1; j++) {
        mv(i, j, 0, 1);
      }
    }
  }
}

function moveUp () {
  for (var pass = 0; pass < State.height - 1; pass++) {
    for (var i = 0; i < State.height - 1; i++) {
      for (var j = 0; j < State.width; j++) {
        mv(i, j, 1, 0);
      }
    }
  }
}

function moveDown () {
  for (var pass = 0; pass < State.height - 1; pass++) {
    for (var i = State.height - 1; i > 0; i--) {
      for (var j = 0; j < State.width; j++) {
        mv(i, j, -1, 0);
      }
    }
  }
}

function mv (i, j, di, dj) {
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
}

function resetCombined () {
  for (var i = 0; i < State.height; i++) {
    for (var j = 0; j < State.width; j++) {
      State.getSquare(i, j).combined = false;
    }
  }
}


/* View */

State.reset();
State.getSquare(0, 0).value = 2;
State.getSquare(0, 1).value = 2;
State.getSquare(0, 2).value = 2;
State.getSquare(0, 3).value = 2;
State.getSquare(1, 3).value = 2;
State.getSquare(3, 3).value = 2;
State.print();
move('d');
State.print();
move('r');
State.print();
move('l');
State.print();
move('u');
State.print();
