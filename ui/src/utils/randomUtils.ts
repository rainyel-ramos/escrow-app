import { Escrow, Escrow__factory } from '@/typechain';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { type WalletClient } from 'wagmi'


export async function approve(signer: any, contractAddress: `0x${string}`) {
  const escrowContract = new Escrow__factory().attach(contractAddress) as Escrow;
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

