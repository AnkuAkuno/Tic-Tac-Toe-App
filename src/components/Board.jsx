import Square from "./Square";
import GameStatus from "./GameStatus";
import GameControls from "./GameControls";
import GameMode from "./GameMode";
import { useState, useEffect } from 'react'
import { calculateWinner, getAIMove } from "../utils/gameLogic";

function Board({isDark, setIsDark}) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState(true);
    const [isAI, setIsAI] = useState(false);

    const winner = calculateWinner(board);
    
    function makeAIMove(index) {
        const nextBoard = board.slice();
        nextBoard[index] = 'O';
        setBoard(nextBoard);
        setIsNext(true);
    }
    
    //otomatisasi giliran AI
    useEffect(() => {
        //jalankan bot kalau mode AI aktif
        if (isAI && !isNext && !winner && board.includes(null)) {
            const timer = setTimeout(() => {
                const aiIndex = getAIMove(board);
                if(aiIndex !== null) {
                    makeAIMove(aiIndex);
                }
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [board, isAI, isNext, winner]);


    function handleClick(index) {
        if (board[index] || winner || (isAI && !isNext)) return;

        const nextBoard = board.slice();

        if(isNext) {
            nextBoard[index] = 'X';
        } else {
            nextBoard[index] = 'O'
        }

        setBoard(nextBoard);
        setIsNext(!isNext);
        
    }


    function handleReset() {

        setBoard(Array(9).fill(null));
        setIsNext(true);

    };

    function  toggleMode() {
        setIsAI(!isAI);
        handleReset();
    }
    
    let status;

    if(winner) {
        status =`Pemenangnya adalah Player ${winner}!`
    } else if (!board.includes(null)) {
        status = `Permainan seri!`;
    } else {
        
        status = `Giliran ${isAI && !isNext ? 'AI (O)' : `Player ${isNext ? 'X' : 'O'}` }`
    }


    return (

        <div>


            <GameMode toggleMode={toggleMode} isAI={isAI} />

            <div className="board">

                <Square value={board[0]} onClick={ () => handleClick(0)} />
                <Square value={board[1]} onClick={ () => handleClick(1)} />
                <Square value={board[2]} onClick={ () => handleClick(2)} />
                <Square value={board[3]} onClick={ () => handleClick(3)} />
                <Square value={board[4]} onClick={ () => handleClick(4)} />
                <Square value={board[5]} onClick={ () => handleClick(5)} />
                <Square value={board[6]} onClick={ () => handleClick(6)} />
                <Square value={board[7]} onClick={ () => handleClick(7)} />
                <Square value={board[8]} onClick={ () => handleClick(8)} />


            </div>

            <GameStatus status={status} />

            <GameControls onReset={handleReset} isDark={isDark} setIsDark={setIsDark} toggleMode={toggleMode} isAI={isAI} />
        </div>
    )

}

export default Board;