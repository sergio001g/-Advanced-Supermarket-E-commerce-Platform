import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { useCartStore } from './store/cartStore';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';

// Sample products with enhanced data
const sampleProducts = [
  {
    id: '1',
    name: 'Fresh Apples',
    description: 'Sweet and crispy red apples',
    price: 2.99,
    image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    category: 'Fruits',
    stock: 50,
    discount: 10,
    rating: 4.5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    description: 'Freshly baked whole grain bread',
    price: 3.49,
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    category: 'Bakery',
    stock: 30,
    rating: 4.8,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Organic Milk',
    description: '1 gallon of organic whole milk',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b',
    category: 'Dairy',
    stock: 25,
    discount: 5,
    rating: 4.2,
    created_at: new Date().toISOString()
  }
];

const categories = ['All', 'Fruits', 'Bakery', 'Dairy', 'Meat', 'Vegetables'];

function App() {
  const cartItems = useCartStore(state => state.items);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  SuperMarket
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 hover:text-gray-800">
                  <UserIcon className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="relative">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-8">
                  <SearchBar onSearch={setSearchQuery} />
                  <CategoryFilter 
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            } />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;