require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const accounts = {
  mnemonic: process.env.REACT_APP_MNEMONIC,
};

module.exports = {
  solidity: "0.8.4",
  networks: {
    fantomtest: {
      url: "https://rpc.testnet.fantom.network",
      accounts,
      chainId: 4002,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
    },
  },
};
