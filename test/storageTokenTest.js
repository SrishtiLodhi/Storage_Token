const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const ZEROADDRESS = ethers.constants.AddressZero;

describe("Storage", function () {
	let testToken, tokenStorage, accounts;

	beforeEach(async () => {
		accounts = await ethers.getSigners();
		// testToken
		const TestToken = await hre.ethers.getContractFactory("TestToken");
		testToken = await TestToken.deploy("1000000000000000");

		await testToken.deployed();

		// tokenStorage
		const TokenStorage = await hre.ethers.getContractFactory("TokenStorage");
		tokenStorage = await TokenStorage.deploy();

		await tokenStorage.deployed();

		// approve tokenStorage contract some tokens
		await testToken.approve(tokenStorage.address, "1000000000000");
	});

	describe("deposit", function () {
		describe("Positive cases", function () {
			it("deposit 200 tokens", async function () {
				// expect to emit the event
				await expect(tokenStorage.deposit(testToken.address, "200000000"))
					.to.emit(tokenStorage, "Deposited")
					.withArgs(accounts[0].address, testToken.address, "200000000");

				// check mapping
				const slabNum = (
					await tokenStorage.getSlab(testToken.address)
				).toString();

				assert.equal(slabNum, "3");
			});
		});

		describe("Negative cases", async function () {
			it("reverts when token amount exceeds maximum capacity", async function () {
				await expect(
					tokenStorage.deposit(testToken.address, "2000000000")
				).to.be.revertedWith("transfer exceeds capacity");
			});
		});
	});

	describe("withdraw ", function () {
		describe("Positive cases", function () {
			it("withdraw 200 tokens", async function () {
				await tokenStorage.deposit(testToken.address, "200000000");
				// expect to emit the event
				await expect(tokenStorage.withdraw(testToken.address, "200000000"))
					.to.emit(tokenStorage, "Withdraw")
					.withArgs(accounts[0].address, testToken.address, "200000000");
			});
		});

		describe("Negative cases", async function () {
			it("reverts when deposited amount is less than amount to withdraw", async function () {
				await expect(
					tokenStorage.withdraw(testToken.address, "200000000")
				).to.be.revertedWith("insufficient balance");
			});
		});
	});
});
