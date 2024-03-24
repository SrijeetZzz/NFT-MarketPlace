import React, { useEffect, useState } from 'react';
import '../styles/Home.css';


const Home = () => {
  const [nft, setNft] = useState([]);

  useEffect(() => {
    getNft();
  }, []);

  const getNft = async () => {
    try {
      let response = await fetch('http://localhost:5000/nfts');
      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }
      let result = await response.json();
      // Check if the result is an array before setting state
      if (Array.isArray(result)) {
        setNft(result);
      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  return (
    <>
      <div className="image-grid-container">
      <div className="image-grid">
        {Array.isArray(nft) && nft.map((image, index) => (
          <div className="image-item" key={index}>
            <img src={image.src} alt={image.name} />
            <div className="details">
              <h4><b>{image.name}</b></h4>
              <p style={{ color: "blue" }}>Buy Now</p>
              <p style={{ color: "blue" }}>{image.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>

  );
};

export default Home;
