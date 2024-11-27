'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi'; // For search icon

const Marketplace = () => {
  // Dummy data for products
  const initialProducts = [
    { id: 1, name: 'COD', price: 50, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
    { id: 2, name: 'Star wars', price: 25, image: '/images/game.png', condition: 'second-hand', category: 'accessory' },
    { id: 3, name: 'Web Game', price: 35, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
    { id: 4, name: 'GTA', price: 150, image: '/images/game.png', condition: 'second-hand', category: 'accessory' },
    { id: 5, name: 'Game Pro', price: 135, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
    { id: 6, name: 'Mega Game', price: 100, image: '/images/game.png', condition: 'second-hand', category: 'web-3-game' },
    { id: 7, name: 'Hangman', price: 50, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
    { id: 8, name: 'Spider Man', price: 25, image: '/images/game.png', condition: 'new', category: 'accessory' },
    { id: 9, name: 'Shooting', price: 35, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
    { id: 10, name: 'PUBG', price: 150, image: '/images/game.png', condition: 'new', category: 'accessory' },
    { id: 11, name: 'Free Fire', price: 135, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
    { id: 12, name: 'Valorant', price: 100, image: '/images/game.png', condition: 'new', category: 'web-3-game' },
  ];

  // State
  const [products, setProducts] = useState(initialProducts); // Marketplace products
  const [secondHandMarket, setSecondHandMarket] = useState(initialProducts.filter((product) => product.condition === 'second-hand')); // Prepopulate with second-hand items
  const [purchasedProducts, setPurchasedProducts] = useState([]); // Products purchased by the user
  const [userCredits, setUserCredits] = useState(1000); // User's credits
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('products'); // Default to products

  // Filtered products based on category
  const filteredProducts =
    selectedCategory === 'products'
      ? products.filter((product) => product.condition === 'new')
      : selectedCategory === 'second-hand'
      ? secondHandMarket
      : purchasedProducts;

  // Handle search input
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filtered products based on search term
  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Buy Logic
  const handleBuy = (productId) => {
    const product = products.find((p) => p.id === productId);
    const secondHandProduct = secondHandMarket.find((p) => p.id === productId);

    if (product || secondHandProduct) {
      const selectedProduct = product || secondHandProduct;

      if (userCredits >= selectedProduct.price) {
        setUserCredits(userCredits - selectedProduct.price); // Deduct credits
        setPurchasedProducts([...purchasedProducts, { ...selectedProduct }]); // Add product to purchased list

        // Remove the purchased item from the relevant market (products or second-hand)
        if (selectedProduct.condition === 'new') {
          setProducts(products.filter((p) => p.id !== productId)); // Remove product from the marketplace
        } else if (selectedProduct.condition === 'second-hand') {
          setSecondHandMarket(secondHandMarket.filter((p) => p.id !== productId)); // Remove from second-hand market
        }

        alert(`You bought ${selectedProduct.name}! Remaining credits: ${userCredits - selectedProduct.price}`);
      } else {
        alert('Not enough credits!');
      }
    }
  };

  // Handle Resell Logic
  const handleResell = (product) => {
    setSecondHandMarket([...secondHandMarket, { ...product, condition: 'second-hand' }]); // Add to second-hand market
    setPurchasedProducts(purchasedProducts.filter((p) => p.id !== product.id)); // Remove from purchased products
    alert(`${product.name} added to the Second-Hand Market!`);
  };

  return (
    <div className="marketplace-page p-4 min-h-screen">
      {/* Marketplace Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mt-4">Welcome to the Marketplace</h1>
      </div>

      {/* User Credits */}
      <div className="text-center mb-4 text-lg font-semibold">
        Your Credits: <span className="text-green-400">{userCredits}</span>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
      <div className="relative w-full md:w-2/3 lg:w-1/3">
        <input
          type="text"
          className="p-3 w-full pr-10 pl-3 border rounded-md text-gray-900"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FiSearch className="absolute right-3 top-3 text-white text-3xl" />
      </div>
    </div>

      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`p-2 rounded-md text-white ${
            selectedCategory === 'products' ? 'bg-blue-600 shadow-lg' : 'bg-gray-600 hover:bg-blue-600'
          }`}
          onClick={() => setSelectedCategory('products')}
        >
          PRODUCTS
        </button>
        <button
          className={`p-2 rounded-md text-white ${
            selectedCategory === 'second-hand' ? 'bg-yellow-600 shadow-lg' : 'bg-gray-600 hover:bg-yellow-600'
          }`}
          onClick={() => setSelectedCategory('second-hand')}
        >
          SECOND HAND MARKET
        </button>
        <button
          className={`p-2 rounded-md text-white ${
            selectedCategory === 'purchased' ? 'bg-green-600 shadow-lg' : 'bg-gray-600 hover:bg-green-600'
          }`}
          onClick={() => setSelectedCategory('purchased')}
        >
          PURCHASED PRODUCTS
        </button>
      </div>


      {/* Product Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedProducts.length > 0 ? (
          searchedProducts.map((product) => (
            <div key={product.id} className="border rounded-md p-4 bg-gray-800 text-white">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
                width={400}
                height={200}
                priority
              />

              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2">{product.condition === 'new' ? 'Brand New' : 'Second Hand'}</p>
              <p className="mt-2 text-lg font-bold">${product.price}</p>

              {/* Render the appropriate button based on the selected category */}
              {selectedCategory === 'products' || selectedCategory === 'second-hand' ? (
                <button
                  className="mt-4 bg-fuchsia-600 text-white px-4 py-2 rounded-md w-full"
                  onClick={() => handleBuy(product.id)}
                >
                  Buy Now
                </button>
              ) : selectedCategory === 'purchased' ? (
                <button
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md w-full"
                  onClick={() => handleResell(product)}
                >
                  Resell
                </button>
              ) : (
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                  disabled
                >
                  Buy
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
