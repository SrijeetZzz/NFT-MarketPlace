// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {

  uint256 private _tokenIDs; // Use uint256 instead of unit256
  address contractAddress;

  constructor(address marketplaceAddress) ERC721("Metaverse Tokens","METT"){
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns(uint256) {

    _tokenIDs++;
    uint256 newItemId = _tokenIDs;

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI); // Set URI for the minted token (newItemId)
    setApprovalForAll(contractAddress, true);
    return newItemId;
  }
}
