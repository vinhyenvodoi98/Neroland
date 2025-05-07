// src/config.ts
export const NERO_CHAIN_CONFIG = {
  chainId: 689,
  chainName: "NERO Chain Testnet",
  rpcUrl: "https://rpc-testnet.nerochain.io",
  currency: "NERO",
  explorer: "https://testnet.neroscan.io"
};

export const AA_PLATFORM_CONFIG = {
  bundlerRpc: "https://bundler.service.nerochain.io",
  paymasterRpc: "https://paymaster-testnet.nerochain.io",
};

// Your API key from the NERO Chain AA Platform
export let API_KEY: string = process.env.API_KEY || "";

// Add NFT contract for testing
export const CONTRACT_ADDRESSES = {
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  accountFactory: "0x9406Cc6185a346906296840746125a0E44976454",
  tokenPaymaster: "0xA919e465871871F2D1da94BccAF3acaF9609D968",
  nftContract: "0x63f1f7c6a24294a874d7c8ea289e4624f84b48cb"
};
