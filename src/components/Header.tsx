'use client';

import AAWalletConnect from "./AAWalletConnect";

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
          <AAWalletConnect />
        </div>
      </div>
    </div>
  );
}
