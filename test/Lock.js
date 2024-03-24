


// const request = require('request'); // Import for request (if needed for HTTP calls)
// const { expect } = require("chai"); // Correct Chai import


// describe("NFTMarket",function(){
//   it("Should create and execute market sales",async function(){
//     const Market = await ethers.getContractFactory("NFTMarket");
//     const market = await Market.deploy(); // Await deployment here
//     //await market.deployed(); // This is no longer needed

//     const marketAddress = market.address; // Access the address after deployment


//     const NFT = await ethers.getContractFactory("NFT")
//     const nft = await NFT.deploy(marketAddress)
//     await nft.deployed()

//     let listingPrice = await market.getListingPrice()
//     listingPrice = listingPrice.toString()

//     const auctionPrice = ethers.utils.parseUnits('100','ether')

//     await nft.createToken("https://www.mytokenlocation.com")
//     await nft.createToken("https://www.mytokenlocation2.com")

//     await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
//     await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})

//     const[_,buyerAddress] = await ethers.getSigners()

//     await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value:auctionPrice})

//     const items = await market.fetchMarketItems()

//     console.log('items: ',items)

//   });
// });





/* test/sample-test.js */
const { ethers } = require("hardhat");

describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy(); // Corrected this line

    let listingPrice = await nftMarketplace.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits('1', 'ether');

    /* create two tokens */
    await nftMarketplace.createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice });
    await nftMarketplace.createToken("https://www.mytokenlocation2.com", auctionPrice, { value: listingPrice });
      
    const [_, buyerAddress] = await ethers.getSigners();
  
    /* execute sale of token to another user */
    await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice });

    /* resell a token */
    await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice });

    /* query for and return the unsold items */
    items = await nftMarketplace.fetchMarketItems();
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nftMarketplace.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      };
      return item;
    }));
    console.log('items: ', items);
  });
});
