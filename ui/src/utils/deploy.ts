import { ethers } from 'ethers';
import Escrow from '@/artifacts/contracts/Escrow.sol/Escrow.json';
import { Escrow__factory } from '@/typechain';

export default async function deploy(signer: any, arbiter: any, beneficiary: any, value: any) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  ) as Escrow__factory;
  const deployTx = await factory.deploy(arbiter, beneficiary, { value });
  return deployTx.waitForDeployment(); 
}
