/* State */

function Square () {
  this.value = 0;
  this.combined = false;
}

var State = {
  board: new Array(4),
  getSquare: function (i, j) {
    return this.board[i][j];
  },
  reset: function () {
    for (var i = 0; i < 4; i++) {
      this.board[i] = new Array(4);
      for (var j = 0; j < 4; j++) {
        this.board[i][j] = new Square();
      }
    }
  },
  print: function () {
    for (var i = 0; i < 4; i++) {
      var myStr = '';      
      for (var j = 0; j < 4; j++) {
        myStr += this.board[i][j].value + ' ';
      }
      console.log(myStr);
    }
  console.log('');
  }
};


/* Logic */

function moveRight () {
  for (var i = 0; i < 4; i++) {
    for (var j = 3; j >= 0; j--) {
    }
  }
}

function resetCombined () {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      State.getSquare(i, j).combined = false;
    }
  }
}


/* View */

State.reset();
State.getSquare(0, 0).value = 2;
State.print();
moveRight();
State.print();
