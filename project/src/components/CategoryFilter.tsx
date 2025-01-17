import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selected, 
  onSelect 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selected === category
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};