//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {USDT} from "../src/Usdt.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract UsdtTest is Test {
    USDT usdt;
    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");

    function setUp() public {
        usdt = new USDT(owner);
        vm.prank(owner);
        usdt.mint(user1, 100);
    }

    function testTransfer() external {
        // make several addresses
        address[] memory addresses = new address[](3);
        addresses[0] = address(0x1);
        addresses[1] = address(0x2);
        addresses[2] = address(0x3);
        vm.startPrank(owner);
        usdt.mint(user1, 100);
        usdt.mint(addresses[0], 100);
        usdt.mint(addresses[1], 100);
        usdt.mint(addresses[2], 100);
        vm.stopPrank();

        vm.prank(user1);
        IERC20(usdt).transfer(owner, 100);
        vm.prank(addresses[0]);
        IERC20(usdt).transfer(owner, 100);
        vm.prank(addresses[1]);
        IERC20(usdt).transfer(owner, 100);
        vm.prank(addresses[2]);
        IERC20(usdt).transfer(owner, 100);

        assertEq(usdt.balanceOf(owner), 400);
    }

    function testUsersCannotMint() external {
        vm.expectRevert();
        vm.prank(user1);
        usdt.mint(user1, 100);
    }
}
