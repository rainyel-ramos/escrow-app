import { useWalletClient } from 'wagmi'
import * as React from 'react'
import { walletClientToSigner } from './randomUtils'


/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId })
    return React.useMemo(
      () => (walletClient ? walletClientToSigner(walletClient) : undefined),
      [walletClient],
    )
  }