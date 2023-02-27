import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// https://hardhat.org/hardhat-runner/docs/config
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  // url endpoints: https://chainlist.org/ 
  networks: {
    hardhat : {
      forking: {
        url: "https://rpc.ankr.com/eth"
      }

    },

  },

};

export default config;
