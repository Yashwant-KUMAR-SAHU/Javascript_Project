// 1. Deposit some money
// 2. Determine the number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings 
// 7. play again


const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8
}

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2
}

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the amount you want to deposit: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberofLines = () => {
  while (true) {
    const Lines = prompt("Enter the number of lines to bet on (1-3): ");
    const NumberofLines = parseFloat(Lines);

    if (isNaN(NumberofLines) || NumberofLines <= 0 || NumberofLines > 3) {
      console.log("Invalid NumberofLines, try again.");
    } else {
      return NumberofLines;
    }
  }
};

const getBet = (balance, Lines) => {
  while (true) {
    const Bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(Bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / Lines) {
      console.log("Invalid Bet, try again.");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);

    }
  }



  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i])
    }
  }

  return rows;
}

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = ""
    for (const [i, symbol] of row.entries()) {
      rowString += symbol
      if (i != row.length - 1) {
        rowString += "  |  "
      }
    }
    console.log(rowString);
  }

};

const getWinning = (rows, Bet, Lines) => {
  let winnings = 0;

  for (let row = 0; row < Lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += Bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const NumberofLines = getNumberofLines();
    const Bet = getBet(balance, NumberofLines);
    balance -= Bet * NumberofLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinning(rows, Bet, NumberofLines);
    balance += winnings;
    console.log("You Won, $" + winnings.toString());


    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playagain = prompt("Do you want to play again (y/n)? ");
    if (playagain != "y") break;
  }
};

game();


