'use client';

export default function Sidebar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li><a className="active">Dashboard</a></li>
          <li>
            <details open>
              <summary>Games</summary>
              <ul>
                <li><a>Minesweeper</a></li>
              </ul>
            </details>
          </li>
          <li><a>Shop</a></li>
          <li><a>Settings</a></li>
        </ul>
      </div>
    </div>
  );
}
