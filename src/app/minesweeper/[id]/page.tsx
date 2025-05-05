'use client';

import { useParams } from 'next/navigation';
import Card from '@/components/Card';

export default function MinesweeperGamePage() {
  const params = useParams();
  const gameId = params.id;

  // Game board size based on difficulty
  const getBoardSize = (id: string) => {
    switch (id) {
      case 'easy':
        return { rows: 9, cols: 9, mines: 10 };
      case 'medium':
        return { rows: 16, cols: 16, mines: 40 };
      case 'hard':
        return { rows: 16, cols: 30, mines: 99 };
      default:
        return { rows: 9, cols: 9, mines: 10 };
    }
  };

  const { rows, cols, mines } = getBoardSize(gameId as string);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <Card
            title={`Minesweeper - ${gameId}`}
            variant="hover"
            bgColor="base-200"
          >
            <div className="flex flex-col gap-4">
              {/* Game Stats */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="badge badge-primary">Mines: {mines}</div>
                  <div className="badge badge-secondary">Time: 00:00</div>
                </div>
                <button className="btn btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Game Board */}
              <div className="grid grid-cols-9 gap-1">
                {Array.from({ length: rows * cols }).map((_, index) => (
                  <button
                    key={index}
                    className="aspect-square btn btn-square btn-ghost bg-base-300 hover:bg-base-200"
                  >
                    <span className="text-lg font-bold">?</span>
                  </button>
                ))}
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
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Power-ups</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="btn btn-sm btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Reveal
                  </button>
                  <button className="btn btn-sm btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Auto-Flag
                  </button>
                  <button className="btn btn-sm btn-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Time Freeze
                  </button>
                </div>
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