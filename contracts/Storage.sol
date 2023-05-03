// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenStorage {
    uint8 decimals = 6;
    uint256 public constant NUM_SLABS = 5;

    // Token decimal is 6
    uint256 private MAX_CAPACITY = 500 * (10 ** decimals);
    uint256[5] private slabMax = [
        500 * (10 ** decimals),
        400 * (10 ** decimals),
        300 * (10 ** decimals),
        200 * (10 ** decimals),
        100 * (10 ** decimals)
    ];

    // events
    event Deposited(
        address indexed tokenOwner,
        address indexed tokenAddress,
        uint256 amount
    );

    event Withdraw(
        address indexed tokenOwner,
        address indexed tokenAddress,
        uint256 amount
    );

    // depositer => token address => deposited amount
    mapping(address => mapping(address => uint256)) public deposited;

    function deposit(address token, uint256 amount) external {
        // Transfer the token from the depositor to this contract
        require(
            deposited[msg.sender][token] + amount <= MAX_CAPACITY,
            "transfer exceeds capacity"
        );

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposited[msg.sender][token] += amount;
        emit Deposited(msg.sender, token, amount);
    }

    function withdraw(address token, uint256 amount) external {
        require(deposited[msg.sender][token] >= amount, "insufficient balance");
        deposited[msg.sender][token] -= amount;

        // Transfer the token from this contract to the depositor
        IERC20(token).transfer(msg.sender, amount);

        emit Withdraw(msg.sender, token, amount);
    }

    function getSlab(address token) external view returns (uint256) {
        require(deposited[msg.sender][token] != 0, "no slab found");
        uint256 slab;
        for (uint256 i = NUM_SLABS - 1; i >= 0; i--) {
            if (deposited[msg.sender][token] <= slabMax[i]) {
                slab = i;
                break;
            }
        }
        return slab;
    }

    function getMaxCapacity() public view returns (uint256) {
        return MAX_CAPACITY;
    }
}
