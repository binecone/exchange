require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.7.6",
// };
const mnemonic = process.env.MNEMONIC;
// const projectId = process.env.PROJECT_ID;
module.exports = {
  solidity: "0.7.6",
  networks: {
    xdctestnet: {
      url: "https://rpc.apothem.network",
      chainId: 51,
      accounts: { mnemonic: mnemonic },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
  // etherscan: {
  //   apiKey: projectId,
  // },
};
