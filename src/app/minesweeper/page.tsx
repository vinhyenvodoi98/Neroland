'use client';

import Link from 'next/link';
import Card from '@/components/Card';

export default function MinesweeperPage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Game Info Card */}
        <Card
          title="Minesweeper"
          variant="hover"
          bgColor="base-200"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              Classic Minesweeper game with modern twist. Clear the minefield without detonating any mines!
            </p>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Best Time</div>
                <div className="stat-value">00:45</div>
                <div className="stat-desc">Easy Mode</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Select Difficulty Card */}
        <Card
          title="Select Difficulty"
          variant="hover"
          bgColor="base-200"
        >
          <div className="flex flex-col gap-4">
            <Link href="/minesweeper/easy" className="btn btn-primary w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Easy (9x9)
            </Link>
            <Link href="/minesweeper/medium" className="btn btn-secondary w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Medium (16x16)
            </Link>
            <Link href="/minesweeper/hard" className="btn btn-accent w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Hard (16x30)
            </Link>
          </div>
        </Card>

        {/* Leaderboard Card */}
        <Card
          title="Leaderboard"
          variant="hover"
          bgColor="base-200"
        >
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Time</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Player1</td>
                  <td>00:45</td>
                  <td>Easy</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Player2</td>
                  <td>01:20</td>
                  <td>Easy</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Player3</td>
                  <td>01:45</td>
                  <td>Easy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Game Rules Card */}
        <Card
          title="Game Rules"
          variant="hover"
          bgColor="base-200"
        >
          <ul className="list-disc pl-4 text-sm">
            <li>Left-click to reveal a square</li>
            <li>Right-click to place/remove a flag</li>
            <li>Numbers show adjacent mines</li>
            <li>Clear all non-mine squares to win</li>
            <li>Click a mine to lose</li>
          </ul>
        </Card>

        {/* Power-ups Card */}
        <Card
          title="Power-ups"
          variant="hover"
          bgColor="base-200"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="badge badge-primary">Reveal</div>
              <span className="text-sm">Reveal a safe square</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-secondary">Auto-Flag</div>
              <span className="text-sm">Automatically flag obvious mines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-accent">Time Freeze</div>
              <span className="text-sm">Pause the timer for 10 seconds</span>
            </div>
          </div>
        </Card>

        {/* Achievements Card */}
        <Card
          title="Achievements"
          variant="hover"
          bgColor="base-200"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="badge badge-primary">First Win</div>
              <span className="text-sm">Win your first game</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-secondary">Speed Demon</div>
              <span className="text-sm">Complete a game in under 1 minute</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-accent">Mine Master</div>
              <span className="text-sm">Win 10 games in a row</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 