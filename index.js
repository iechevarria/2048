/* State */

function Square () {
  this.value = 0;
  this.combined = false;
}

var State = {
  height: 4,
  width: 4,
  board: new Array(4),
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
    for (var i = 0; i < this.height; i++) {
      var myStr = '';      
      for (var j = 0; j < this.width; j++) {
        myStr += this.board[i][j].value + ' ';
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
        cur = State.getSquare(i, j);
        left = State.getSquare(i, j - 1);
        if (cur.value === 0) {
          cur.value = left.value;
          left.value = 0;
        } else if (cur.value === left.value && !cur.combined && !left.combined) {
          cur.value *= 2;
          left.value = 0;
          cur.combined = true;
        }
      }
    }
  }
}

function moveLeft () {
  for (var pass = 0; pass < State.width - 1; pass++) {
    for (var i = 0; i < State.height; i++) {
      for (var j = 0; j < State.width - 1; j++) {
        cur = State.getSquare(i, j);
        right = State.getSquare(i, j + 1);
        if (cur.value === 0) {
          cur.value = right.value;
          right.value = 0;
        } else if (cur.value === right.value && !cur.combined && !right.combined) {
          cur.value *= 2;
          right.value = 0;
          cur.combined = true;
        }
      }
    }
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
State.print();
move('l');
State.print();
move('r');
State.print();
