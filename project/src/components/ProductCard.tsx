import React, { useState } from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { StarIcon, HeartIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const getBulkDiscount = (quantity: number) => {
    if (!product.bulkDiscount) return null;
    return product.bulkDiscount.find(d => quantity >= d.quantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.discount && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              {product.discount}% OFF
            </div>
          )}
          {product.organic && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              Organic
            </div>
          )}
        </div>
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 left-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          {isFavorite ? (
            <HeartIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutlineIcon className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          {product.nutritionalInfo && (
            <button
              onClick={() => setShowNutritionalInfo(!showNutritionalInfo)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <InformationCircleIcon className="h-6 w-6 text-blue-500" />
            </button>
          )}
        </div>
        <p className="text-gray-600 mt-1">{product.description}</p>
        
        {showNutritionalInfo && product.nutritionalInfo && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm">
            <h4 className="font-semibold mb-1">Nutritional Information</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>Calories: {product.nutritionalInfo.calories}</div>
              <div>Protein: {product.nutritionalInfo.protein}g</div>
              <div>Carbs: {product.nutritionalInfo.carbs}g</div>
              <div>Fat: {product.nutritionalInfo.fat}g</div>
            </div>
          </div>
        )}

        {product.allergens && product.allergens.length > 0 && (
          <div className="mt-2 text-sm text-red-600">
            Allergens: {product.allergens.join(', ')}
          </div>
        )}
        
        {product.rating && (
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">{product.rating}</span>
          </div>
        )}
        
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <div>
              {product.discount ? (
                <div>
                  <span className="text-xl font-bold text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <div className="text-sm text-gray-500">
                per {product.unit || 'unit'}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-4 py-2 rounded-lg transition ${
                product.stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {product.bulkDiscount && (
          <div className="mt-2 text-sm text-blue-600">
            Bulk Discounts Available:
            {product.bulkDiscount.map((discount, index) => (
              <div key={index}>
                Buy {discount.quantity}+ get {discount.percentage}% off
              </div>
            ))}
          </div>
        )}

        <div className="mt-2 text-sm">
          <div className="text-gray-500">
            Stock: {product.stock} units
          </div>
          {product.origin && (
            <div className="text-gray-500">
              Origin: {product.origin}
            </div>
          )}
          {product.expirationDate && (
            <div className="text-gray-500">
              Best before: {new Date(product.expirationDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};