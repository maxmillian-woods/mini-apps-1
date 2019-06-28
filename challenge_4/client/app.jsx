const WIN_CONDITION = 4;
const NUM_ROWS = 6;
const NUM_COLS = 7;

class App extends React.Component {
  constructor(props) {
    super(props),
      (this.players = {
        "-1": "Red",
        "1": "Black"
      });
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      whosTurn: "-1",
      color: "color: red",
      winner: ""
    };
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.board.map((row, rowNum) => (
            <tr className="row" key={`row${rowNum}`}>
              {row.map((col, colNum) => (
                <td
                  className="col"
                  key={`row${rowNum} col${colNum}`}
                  onClick={this.toggle.bind(this, rowNum, colNum)}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <h1>{this.state.winner}</h1>
      </table>
    );
  }

  toggle(rowNum, colNum) {
    var emptyRow = null;
    for (var i = this.state.board.length - 1; i >= 0; i--) {
      if (this.state.board[i][colNum] === 0) {
        emptyRow = i;
        break;
      }
    }
    if (emptyRow !== null) {
      this.setState(prevState => {
        prevState.board[emptyRow][colNum] = prevState.whosTurn;
        return { board: prevState.board }, this.checkWinner();
      });
      this.setState(prevState => {
        return { whosTurn: prevState.whosTurn * -1 };
      });
    }
  }

  checkWinner() {
    if (!!this.checkRows()) {
      this.setState(prevState => {
        return { winner: this.checkRows() + " wins!" };
      });
      // console.log(this.checkRows() + " wins!");
    }
    if (!!this.checkCols()) {
      this.setState(prevState => {
        return { winner: this.checkCols() + " wins!" };
      });
      // console.log(this.checkCols() + " wins!");
    }
    if (!!this.checkMajDiags()) {
      this.setState(prevState => {
        return { winner: this.checkMajDiags() + " wins!" };
      });
      // console.log(this.checkMajDiags() + " wins!");
    }
    if (!!this.checkMinDiags()) {
      this.setState(prevState => {
        return { winner: this.checkCols() + " wins!" };
      });
      // console.log(this.checkMinDiags() + " wins!");
    }
    if (!!this.checkTie()) {
      this.setState(prevState => {
        return { winner: "Tie" };
      });
      // console.log("Tie!");
    }
  }

  checkRows() {
    for (var rowNum = 0; rowNum < NUM_ROWS; rowNum++) {
      var p1Counter = 0;
      var p2Counter = 0;
      for (var colNum = 0; colNum < NUM_COLS; colNum++) {
        if (this.state.board[rowNum][colNum] === -1) {
          p1Counter += -1;
          p2Counter = 0;
        }
        if (this.state.board[rowNum][colNum] === 0) {
          p1Counter = 0;
          p2Counter = 0;
        }
        if (this.state.board[rowNum][colNum] === 1) {
          p1Counter = 0;
          p2Counter += 1;
        }
        if (p1Counter === -WIN_CONDITION) {
          return this.players["-1"];
        }
        if (p2Counter === WIN_CONDITION) {
          return this.players["1"];
        }
      }
    }
  }

  checkCols() {
    for (var colNum = 0; colNum < NUM_COLS; colNum++) {
      var col = [];
      for (var rowNum = 0; rowNum < NUM_ROWS; rowNum++) {
        col.push(this.state.board[rowNum][colNum]);
      }
      var p1Counter = 0;
      var p2Counter = 0;
      for (var i = 0; i < col.length; i++) {
        if (col[i] === -1) {
          p1Counter += -1;
          p2Counter = 0;
        }
        if (col[i] === 0) {
          p1Counter = 0;
          p2Counter = 0;
        }
        if (col[i] === 1) {
          p1Counter = 0;
          p2Counter += 1;
        }
        if (p1Counter === -WIN_CONDITION) {
          return this.players["-1"];
        }
        if (p2Counter === WIN_CONDITION) {
          return this.players["1"];
        }
      }
    }
  }

  isInBounds(rowNum, colNum) {
    return 0 <= rowNum && rowNum < NUM_ROWS && 0 <= colNum && colNum < NUM_COLS;
  }

  checkMajDiags() {
    for (
      var majDiag = -NUM_ROWS + WIN_CONDITION;
      majDiag < NUM_COLS - WIN_CONDITION;
      majDiag++
    ) {
      var md = [];
      for (var i = majDiag; i < NUM_COLS; i++) {
        if (this.isInBounds(i, i - majDiag)) {
          var val = this.state.board[i][i - majDiag];
          md.push(val);
        }
      }
      var p1Counter = 0;
      var p2Counter = 0;
      for (var j = 0; j < md.length; j++) {
        if (md[j] === -1) {
          p1Counter += -1;
          p2Counter = 0;
        }
        if (md[j] === 0) {
          p1Counter = 0;
          p2Counter = 0;
        }
        if (md[j] === 1) {
          p1Counter = 0;
          p2Counter += 1;
        }
        if (p1Counter === -WIN_CONDITION) {
          return this.players["-1"];
        }
        if (p2Counter === WIN_CONDITION) {
          return this.players["1"];
        }
      }
    }
  }

  checkMinDiags() {
    for (
      var minDiag = NUM_COLS - 1 + NUM_ROWS - WIN_CONDITION;
      minDiag >= 0;
      minDiag--
    ) {
      var md = [];
      for (var i = minDiag; i >= 0; i--) {
        if (this.isInBounds(minDiag - i, i)) {
          var val = this.state.board[minDiag - i][i];
          md.push(val);
        }
      }
      var p1Counter = 0;
      var p2Counter = 0;
      for (var j = 0; j < md.length; j++) {
        if (md[j] === -1) {
          p1Counter += -1;
          p2Counter = 0;
        }
        if (md[j] === 0) {
          p1Counter = 0;
          p2Counter = 0;
        }
        if (md[j] === 1) {
          p1Counter = 0;
          p2Counter += 1;
        }
        if (p1Counter === -WIN_CONDITION) {
          return this.players["-1"];
        }
        if (p2Counter === WIN_CONDITION) {
          return this.players["1"];
        }
      }
    }
  }

  checkTie() {
    var isTie = true;
    for (var i = 0; i < this.state.board.length; i++) {
      if (this.state.board[i].includes(0)) {
        isTie = isTie && false;
      }
    }
    return isTie;
  }
}
export default App;
