require("@nomicfoundation/hardhat-toolbox");
const fs = require ("fs")
const privateKey = fs.readFileSync(".secret").toString()


module.exports = {
  networks:{
    hardhat: {
      chainId:31337
    },
    mumbai: {
      url:'https://polygon-mumbai.infura.io/v3/35b7743e19734c8e8444dfcd560502e8',
      accounts: [privateKey]
    },
    mainnet: {
      url:'https://polygon-mainnet.infura.io/v3/35b7743e19734c8e8444dfcd560502e8',
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};








