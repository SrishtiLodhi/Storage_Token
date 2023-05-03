require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.4",

	networks: {
		goerli: {
			url: process.env.GOERLI_TESTNET_URL,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
	etherscan: {
		// yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			goerli: process.env.ETHERSCAN_API_KEY,
		},
	},
};