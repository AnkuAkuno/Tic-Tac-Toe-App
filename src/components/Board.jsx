import Square from "./Square";
import GameStatus from "./GameStatus";
import GameControls from "./GameControls";
import { useState, useEffect } from 'react'
import { calculateWinner, getAIMove } from "../utils/gameLogic";
import ScoreBoard from "./ScoreBoard";

function Board({gameMode, difficulty, playerSymbol, onHome}) {


    const [board, setBoard] = useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState(true);
    const aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
    const winner = calculateWinner(board);
    const currentTurnSymbol = isNext ? 'X' : 'O';
    const isAITurn = gameMode === 'ai' && !winner && ( currentTurnSymbol === aiSymbol);
    const [scores, setScores] = useState({X: 0, O: 0, draws: 0});
    const [startingPlayer, setStartingPlayer] = useState('X');
    const isGameOver = winner || !board.includes(null);
    
    //otomatisasi giliran AI
    useEffect (() => {
        if (isAITurn && board.includes(null)) {
            const timer = setTimeout (() => {
                const aiIndex = getAIMove(board, difficulty, aiSymbol);

                if (aiIndex !== null) {
                    const nextBoard = board.slice();
                    nextBoard[aiIndex] = aiSymbol;
                    setBoard(nextBoard);


                    const gameWinner = calculateWinner(nextBoard);
                    if (gameWinner) {
                        setScores ((prev) => ({...prev, [gameWinner]: prev[gameWinner] + 1}));
                    } else if (!nextBoard.includes (null)) {
                        setScores ((prev) => ({...prev, draws: prev.draws + 1}));
                    } else {   
                        setIsNext(!isNext);
                    }
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [board, isAITurn, difficulty, aiSymbol, isNext]);


    function handleClick(index) {
        if (board[index] || winner ||isAITurn) return;

        const nextBoard = board.slice();
        if (gameMode === 'ai') {
            nextBoard[index] = playerSymbol
        } else {
            nextBoard[index] = isNext ? 'X' : 'O';
        }

        setBoard(nextBoard);

        const gameWinner = calculateWinner(nextBoard);
        if (gameWinner) {
            setScores ((prev) => ({...prev, [gameWinner]: prev[gameWinner] + 1}));
        } else if (!nextBoard.includes(null)) {
            setScores((prev) => ({...prev, draws: prev.draws + 1}));
        } else {
            setIsNext(!isNext);
        }        
    }


    function handleReset() {

        const nextStarter = startingPlayer === 'X' ? 'O' : 'X';

        setBoard(Array(9).fill(null));
        setStartingPlayer(nextStarter);
        setIsNext(nextStarter === 'X');

    };
    
    let status;

    if(winner) {
        status =`Pemenangnya adalah Player ${winner}!`;
    } else if (!board.includes(null)) {
        status = `Permainan seri!`;
    } else {
        const currentTurn = isNext ? 'X' : 'O';
        status = `Giliran Player ${currentTurn}`
    }


    return (


        <div>

            <ScoreBoard scores={scores} playerSymbol={playerSymbol} gameMode={gameMode} />

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
            
            <GameControls onReset={handleReset} onHome={onHome} winner={winner} isGameOver={isGameOver} />
        </div>
    )

}

export default Board;