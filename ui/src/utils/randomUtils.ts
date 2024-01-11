import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { type WalletClient } from 'wagmi'


export async function approve(escrowContract: any, signer: any) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

