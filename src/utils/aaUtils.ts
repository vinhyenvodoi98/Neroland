import { ethers } from 'ethers';
import { Client, Presets } from 'userop';
import { NERO_CHAIN_CONFIG, AA_PLATFORM_CONFIG, CONTRACT_ADDRESSES } from '../config';

// Get Ethereum provider
export const getProvider = () => {
return new ethers.providers.JsonRpcProvider(NERO_CHAIN_CONFIG.rpcUrl);
};

// Get signer from browser wallet
export const getSigner = async () => {
if (!window.ethereum) {
  throw new Error("No crypto wallet found. Please install Metamask.");
}

await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new ethers.providers.Web3Provider(window.ethereum);
return provider.getSigner();
};

// Initialize AA Client
export const initAAClient = async (accountSigner: ethers.Signer) => {
return await Client.init(NERO_CHAIN_CONFIG.rpcUrl, {
  overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
  entryPoint: CONTRACT_ADDRESSES.entryPoint,
});
};

// Get AA wallet address for a signer
export const getAAWalletAddress = async (accountSigner: ethers.Signer, apiKey?: string) => {
try {
  // Initialize the SimpleAccount builder
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    accountSigner,
    NERO_CHAIN_CONFIG.rpcUrl,
    {
      overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
      entryPoint: CONTRACT_ADDRESSES.entryPoint,
      factory: CONTRACT_ADDRESSES.accountFactory,
    }
  );

  // Get the counterfactual address of the AA wallet
  const address = await simpleAccount.getSender();
  console.log("AA wallet address:", address);

  return address;
} catch (error) {
  console.error("Error getting AA wallet address:", error);
  throw error;
}
};
