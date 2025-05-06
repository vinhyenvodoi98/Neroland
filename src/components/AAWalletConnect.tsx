import React, { useState } from 'react';
import { getSigner, getAAWalletAddress } from '../utils/aaUtils';

const AAWalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [aaWalletAddress, setAAWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);

      // Get signer from browser wallet
      const signer = await getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);

      // Get AA wallet address
      const aaAddress = await getAAWalletAddress(signer);
      setAAWalletAddress(aaAddress);

      setIsConnected(true);
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      alert(error.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="dropdown dropdown-end">
        <button
          onClick={!isConnected ? connectWallet : undefined}
          disabled={isLoading}
          tabIndex={0}
          className={`
            btn btn-primary min-w-[200px]
            ${isLoading ? 'loading' : ''}
            ${isConnected ? 'btn-success' : ''}
          `}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Connecting...
            </>
          ) : isConnected ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Connected
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Connect Wallet
            </>
          )}
        </button>

        {isConnected && (
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96 mt-2">
            <li className="menu-title">
              <span>Wallet Information</span>
            </li>
            <li>
              <div className="flex flex-col gap-1 p-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">EOA Address:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">{userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}</span>
                    <button 
                      className="btn btn-ghost btn-xs" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(userAddress || '');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">AA Wallet Address:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">{aaWalletAddress?.slice(0, 6)}...{aaWalletAddress?.slice(-4)}</span>
                    <button 
                      className="btn btn-ghost btn-xs" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(aaWalletAddress || '');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="divider my-1"></div>
                <p className="text-xs text-base-content/70 italic">
                  This AA wallet is counterfactual and will be deployed on your first transaction.
                </p>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AAWalletConnect;