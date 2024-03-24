import React, { useState } from 'react';
import '../styles/create.css';
import nft3Image from '../images/nft3.jpeg';

const Create = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!image || !name || !price) {
      setError(true);
      return;
    }

    console.log('Form submitted:', { image, name, price });
    // Reset form fields
    setImage('');
    setName('');
    setPrice('');
    setError(false); // Reset error state
  };

  const addNft=async ()=>{
    if (!image || !name || !price) {
      setError(true);
      return false;
    }
    console.warn(image, name, price);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.warn(userId._id);

    try {
      let response = await fetch('http://localhost:5000/createnft', {
        method: 'POST',
        headers: {

          "Content-Type": "application/json"
        },
   
        body: JSON.stringify({
          image: image,
          name: name,
          price: price,
          ownerID: userId._id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create NFT');
      }

      let result = await response.json();
      console.warn(result);
      alert('NFT Created Successfully!');
    } catch (error) {
      console.error('Error creating NFT:', error);
      alert('Failed to create NFT. Please try again.');
    }
  }

  return (
    <>
      <img src={nft3Image} alt="" />
      <div className="con">
        <h1 style={{ padding: 0 }}>Create NFT</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Image URL:&nbsp; </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.value)}
              required
            />
            {error && !image && <span style={{ color: 'red' }}>Enter valid Image URL</span>}
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            {error && !name && <span style={{ color: 'red' }}>Enter valid Name</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            {error && !price && <span style={{ color: 'red' }}>Enter valid Price </span>}
          </div>
          <button type="submit" onClick={addNft}>
            Create NFT
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
