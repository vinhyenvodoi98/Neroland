'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';

type CellState = 'hidden' | 'revealed' | 'flagged';
type CellValue = number | 'mine';

interface Cell {
  value: CellValue;
  state: CellState;
}

const BOARD_SIZE = 9;
const MINE_COUNT = 10;

const createEmptyBoard = (): Cell[][] => {
  return Array(BOARD_SIZE).fill(null).map(() =>
    Array(BOARD_SIZE).fill(null).map(() => ({
      value: 0,
      state: 'hidden'
    }))
  );
};

const placeMines = (board: Cell[][], firstRow: number, firstCol: number): Cell[][] => {
  const newBoard = JSON.parse(JSON.stringify(board));
  let minesPlaced = 0;

  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);

    // Don't place mine on first click or where there's already a mine
    if ((row !== firstRow || col !== firstCol) && newBoard[row][col].value !== 'mine') {
      newBoard[row][col].value = 'mine';
      minesPlaced++;
    }
  }

  return newBoard;
};

const calculateNumbers = (board: Cell[][]): Cell[][] => {
  const newBoard = JSON.parse(JSON.stringify(board));

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (newBoard[row][col].value !== 'mine') {
        let count = 0;
        // Check all 8 surrounding cells
        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const newRow = row + r;
            const newCol = col + c;
            if (
              newRow >= 0 && newRow < BOARD_SIZE &&
              newCol >= 0 && newCol < BOARD_SIZE &&
              newBoard[newRow][newCol].value === 'mine'
            ) {
              count++;
            }
          }
        }
        newBoard[row][col].value = count;
      }
    }
  }

  return newBoard;
};

const revealEmptyCells = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const queue = [[row, col]];

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift()!;
    
    if (
      currentRow < 0 || currentRow >= BOARD_SIZE ||
      currentCol < 0 || currentCol >= BOARD_SIZE ||
      newBoard[currentRow][currentCol].state === 'revealed' ||
      newBoard[currentRow][currentCol].state === 'flagged'
    ) {
      continue;
    }

    newBoard[currentRow][currentCol].state = 'revealed';

    if (newBoard[currentRow][currentCol].value === 0) {
      // If it's an empty cell, reveal all surrounding cells
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (r === 0 && c === 0) continue;
          queue.push([currentRow + r, currentCol + c]);
        }
      }
    }
  }

  return newBoard;
};

const checkWin = (board: Cell[][]): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = board[row][col];
      if (cell.value !== 'mine' && cell.state !== 'revealed') {
        return false;
      }
    }
  }
  return true;
};

export default function MinesweeperGamePage() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.id;

  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  // Only allow easy mode for now
  if (gameId !== 'easy') {
    router.push('/minesweeper/easy');
    return null;
  }

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].state === 'flagged') {
      return;
    }

    if (!timerActive) setTimerActive(true);

    let newBoard = [...board];

    if (firstClick) {
      // Place mines after first click
      newBoard = placeMines(newBoard, row, col);
      newBoard = calculateNumbers(newBoard);
      newBoard = revealEmptyCells(newBoard, row, col);
      setFirstClick(false);
    } else {
      if (newBoard[row][col].value === 'mine') {
        // Game over - reveal all mines
        newBoard = newBoard.map(row => 
          row.map(cell => ({
            ...cell,
            state: cell.value === 'mine' ? 'revealed' : cell.state
          }))
        );
        setGameOver(true);
      } else {
        newBoard = revealEmptyCells(newBoard, row, col);
      }
    }

    const won = checkWin(newBoard);
    if (won) {
      setGameWon(true);
    }

    setBoard(newBoard);
  };

  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameWon || board[row][col].state === 'revealed') {
      return;
    }

    const newBoard = [...board];
    const cell = newBoard[row][col];
    const newFlagCount = cell.state === 'flagged' ? flagCount - 1 : flagCount + 1;

    newBoard[row][col] = {
      ...cell,
      state: cell.state === 'flagged' ? 'hidden' : 'flagged'
    };

    setBoard(newBoard);
    setFlagCount(newFlagCount);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setGameOver(false);
    setGameWon(false);
    setFlagCount(0);
    setFirstClick(true);
    setTime(0);
    setTimerActive(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCellColor = (value: number | 'mine') => {
    if (value === 'mine') return 'text-error';
    const colors = [
      'text-base-content',
      'text-primary',
      'text-success',
      'text-error',
      'text-primary',
      'text-error',
      'text-success',
      'text-base-content',
      'text-base-content'
    ];
    return colors[value as number];
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <Card
            title="Minesweeper"
            variant="hover"
            bgColor="base-200"
          >
            <div className="flex flex-col gap-4">
              {/* Game Stats */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="badge badge-primary">Mines: {MINE_COUNT - flagCount}</div>
                  <div className="badge badge-secondary">Time: {formatTime(time)}</div>
                </div>
                <button 
                  className="btn btn-circle"
                  onClick={resetGame}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Game Status */}
              {(gameOver || gameWon) && (
                <div className={`alert ${gameWon ? 'alert-success' : 'alert-error'}`}>
                  <span>{gameWon ? 'You Won!' : 'Game Over!'}</span>
                </div>
              )}

              {/* Game Board */}
              <div className="grid grid-cols-9 gap-1">
                {board.map((row: Cell[], rowIndex: number) =>
                  row.map((cell: Cell, colIndex: number) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        aspect-square btn btn-square
                        ${cell.state === 'revealed' ? 'bg-base-200' : 'bg-base-300 hover:bg-base-200'}
                        ${cell.state === 'flagged' ? 'text-error' : ''}
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                      disabled={gameOver || gameWon}
                    >
                      {cell.state === 'revealed' && cell.value !== 0 && cell.value !== 'mine' && (
                        <span className={`text-lg font-bold ${getCellColor(cell.value)}`}>
                          {cell.value}
                        </span>
                      )}
                      {cell.state === 'revealed' && cell.value === 'mine' && (
                        <span className="text-lg font-bold text-error">💣</span>
                      )}
                      {cell.state === 'flagged' && '🚩'}
                      {cell.state === 'hidden' && '?'}
                    </button>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="lg:col-span-1">
          <Card
            title="Controls"
            variant="hover"
            bgColor="base-200"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">How to Play</h3>
                <ul className="list-disc pl-4 text-sm">
                  <li>Left-click to reveal a square</li>
                  <li>Right-click to place/remove a flag</li>
                  <li>Numbers show adjacent mines</li>
                  <li>Clear all non-mine squares to win</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Game Stats</h3>
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Best Time</div>
                    <div className="stat-value">00:45</div>
                    <div className="stat-desc">Easy Mode</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 