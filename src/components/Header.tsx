'use client';

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="flex items-center justify-center text-xl h-full">N</span>
            </div>
          </div>
          <a className="btn btn-ghost normal-case text-xl text-primary">Neroland</a>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <div className="input-group">
            <input type="text" placeholder="Search..." className="input input-bordered w-24 md:w-auto" />
            <button className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
