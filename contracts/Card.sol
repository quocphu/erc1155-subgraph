pragma solidity 0.6.11;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Card is ERC1155, Ownable {

    constructor (string memory uri_) ERC1155(uri_) public {
        
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) onlyOwner() external {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) onlyOwner() external {
        _mintBatch(to, ids, amounts, data);
    }

}