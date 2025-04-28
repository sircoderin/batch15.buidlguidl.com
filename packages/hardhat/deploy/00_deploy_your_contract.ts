import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

// Update with your Batch number
const BATCH_NUMBER = "15";

/**
 * Deploys a contract named "deployYourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("BatchRegistry", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, BATCH_NUMBER],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const batchRegistry = await hre.ethers.getContract<Contract>("BatchRegistry", deployer);
  batchRegistry.transferOwnership("0xd6353Ff442dfa5ecf6dFe33C23f3da65654C0F21");
  console.log("\nBatchRegistry deployed to:", await batchRegistry.getAddress());
  console.log("Remember to update the allow list!\n");

  // The GraduationNFT contract is deployed on the BatchRegistry constructor.
  const batchGraduationNFTAddress = await batchRegistry.batchGraduationNFT();
  console.log("BatchGraduation NFT deployed to:", batchGraduationNFTAddress, "\n");

  await deploy("Metadata", {
    from: deployer,
    args: ["sircoderin", "3", "4", "5"],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const metadata = await hre.ethers.getContract<Contract>("Metadata", deployer);
  console.log("\nMetadata deployed to:", await metadata.getAddress());
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["BatchRegistry"];
