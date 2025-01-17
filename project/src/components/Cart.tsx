import React from 'react';
import { useCartStore } from '../store/cartStore';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-2 border-b">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-100 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-100 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="p-1 text-gray-500 hover:text-red-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      <div className="mt-4 text-right">
        <div className="text-xl font-bold">
          Total: ${total().toFixed(2)}
        </div>
        <button className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Checkout
        </button>
      </div>
    </div>
  );
};