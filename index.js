// State

function Square () {
  this.value = 0;
  this.combined = false;
}

Square.prototype.resetCombined = function () {this.combined = false;};

Square.prototype.isCombined = function () {return this.combined;};

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
  }
};

State.reset();
console.log(State.board);

// Logic


// View
