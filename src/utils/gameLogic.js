
export function calculateWinner(Squares) {
    const condition=  [
        
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];

    for (let i = 0; i < condition.length; i++) {
        const [a, b, c] = condition[i];

        if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
            return Squares[a];
        }

    }
      
    return null;
}

//Funsgi untuk mencari indeks kemenangan/blocking dari AI
function findWinningMove(board, symbol) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    //Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    //Vertikal
        [0, 4, 8], [2, 4, 6]                //Diagonal
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        const values = [board[a], board[b], board[c]];

        //cek jika 2 kotak diisi oleh simbol yang dicari dan 1 kotak masih kosong
        const symbolCount = values.filter(v => v === symbol).length;
        const nullCount = values.filter(v => v === null).length;

        if (symbolCount === 2 && nullCount === 1) {
            //kembalikan indeks yang masih kosong
            if(board[a] === null) return a;
            if(board[b] === null) return b;
            if(board[c] === null) return c;

        }
    }

    return null;
}

// --- ALGORITMA MINIMAX REKURSIF (HARD AI) ---
function minimax(board, depth, isMaximizing, aiSymbol, playerSymbol) {
  const winner = calculateWinner(board);

  // Base Case (Kondisi Berhenti Rekursi)
  if (winner === aiSymbol) return 10 - depth;
  if (winner === playerSymbol) return depth - 10;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiSymbol;
        let score = minimax(board, depth + 1, false, aiSymbol, playerSymbol);
        board[i] = null; // Backtrack
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = playerSymbol;
        let score = minimax(board, depth + 1, true, aiSymbol, playerSymbol);
        board[i] = null; // Backtrack
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Fungsi pencari langkah terbaik menggunakan Minimax
function getBestMove(board, aiSymbol) {
  const playerSymbol = aiSymbol === 'X' ? 'O' : 'X';
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = aiSymbol;
      let score = minimax(board, 0, false, aiSymbol, playerSymbol);
      board[i] = null; // Backtrack

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

export function getAIMove(board, difficulty, aiSymbol = 'O') {
    const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

    if (emptyIndices.length === 0) return null;

    const playerSymbol = aiSymbol === 'X' ? 'O' : 'X';

    // --- EASY MODE ---
    if(difficulty === 'easy') {
        const randomIndex = Math.floor(Math.random() * emptyIndices.length);
        return emptyIndices[randomIndex];
    }

    // --- MEDIUM MODE ---
    if (difficulty === 'medium') {
        // Prioritas 1 : Cek Kemungkingkan menang di giliran ini
        const winMove = findWinningMove(board, aiSymbol);
        if (winMove !== null) return winMove;

        //Prioritas 2 : cek apakah perlu Block langkah player yang mau menang
        const blockMove = findWinningMove(board, playerSymbol);
        if (blockMove !== null) return blockMove;

        //Prioritas 3 : jika tidak ada yang perlu di block/win, pilih acak
        const randomIndex = Math.floor(Math.random() * emptyIndices.length);
        return emptyIndices[randomIndex];
    }

    // --- HARD MODE ---
    if (difficulty === 'hard') {
        return getBestMove(board, aiSymbol);
    }

    //default fallback
    const ranndomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[ranndomIndex];
}