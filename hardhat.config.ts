import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  typechain: {
    outDir: "./ui/src/typechain",
    target: "ethers-v6",
  },
  paths: {
    artifacts: "./ui/src/artifacts",
  }
};

export default config;
