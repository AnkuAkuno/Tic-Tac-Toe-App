
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

export function getAIMove (board) {
    const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

    if (emptyIndices.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
}