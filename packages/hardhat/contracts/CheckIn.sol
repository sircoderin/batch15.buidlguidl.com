//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IBatchRegistry {
    function checkIn() external;
}

contract CheckIn is Ownable {
    bool checkedIn = false;
    address batchRegistry;

    constructor(address initialOwner, address _batchRegistry) Ownable(initialOwner) {
        batchRegistry = _batchRegistry;
    }

    function checkIn() public {
        if (checkedIn) {
            revert("Already checked in");
        }

        checkedIn = true;
        IBatchRegistry(batchRegistry).checkIn();
    }

    receive() external payable {}
}
