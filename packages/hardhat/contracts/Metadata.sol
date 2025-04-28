//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IGraduateNFTMetadata {
    function getName() external view returns (string memory);

    function getColor() external view returns (uint8, uint8, uint8);
}

contract Metadata is IGraduateNFTMetadata {
    string public name;
    uint8 public red;
    uint8 public green;
    uint8 public blue;

    event MetadataUpdated(string name, uint8 red, uint8 green, uint8 blue);

    constructor(string memory _name, uint8 _red, uint8 _green, uint8 _blue) {
        name = _name;
        red = _red;
        green = _green;
        blue = _blue;
    }

    function updateMetadata(string memory _name, uint8 _red, uint8 _green, uint8 _blue) public {
        name = _name;
        red = _red;
        green = _green;
        blue = _blue;

        emit MetadataUpdated(_name, _red, _green, _blue);
    }

    function getName() external view override returns (string memory) {
        return name;
    }

    function getColor() external view override returns (uint8, uint8, uint8) {
        return (red, green, blue);
    }
}
