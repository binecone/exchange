
const hre = require("hardhat");

async function main() {
  try {
    const EXTF = await hre.ethers.getContractFactory("EXTF");
    const extf = await EXTF.deploy();

    if (typeof extf.deployed === 'function') {
      await extf.deployed();
      console.log("Contract deployed to:", extf.address);
    } else {
      console.error('extf.deployed is not a function');
    }
  } catch (error) {
    console.error('An error occurred during deployment:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

