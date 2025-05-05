'use client';

import Card from '@/components/Card';

export default function MinesweeperPage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Game Info Card */}
        <Card
          title="Minesweeper"
          variant="hover"
        >
          <p>A classic puzzle game where you need to clear a minefield without detonating any mines.</p>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Best Time</div>
              <div className="stat-value">00:45</div>
              <div className="stat-desc">Easy Mode</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 