export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  created_at: string;
  discount?: number;
  rating?: number;
  reviews?: Review[];
  nutritionalInfo?: NutritionalInfo;
  allergens?: string[];
  organic?: boolean;
  origin?: string;
  expirationDate?: string;
  unit?: string;
  bulkDiscount?: BulkDiscount[];
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins?: { [key: string]: number };
  minerals?: { [key: string]: number };
}

export interface BulkDiscount {
  quantity: number;
  percentage: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  name?: string;
  address?: Address[];
  phone?: string;
  preferences?: UserPreferences;
  loyaltyPoints: number;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  favoriteProducts: string[];
  dietaryRestrictions?: string[];
  shoppingLists?: ShoppingList[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  label?: string;
}

export interface UserPreferences {
  preferredPaymentMethod?: string;
  newsletterSubscribed: boolean;
  pushNotifications: boolean;
  dietaryPreferences?: string[];
  favoriteCategories?: string[];
  language: string;
  currency: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  created_at: string;
  isRecurring?: boolean;
  frequency?: 'weekly' | 'biweekly' | 'monthly';
}

export interface ShoppingListItem {
  productId: string;
  quantity: number;
  checked: boolean;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
  images?: string[];
  helpful_votes: number;
  verified_purchase: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  loyaltyPointsEarned: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  shipping_address: Address;
  billing_address: Address;
  payment_method: PaymentMethod;
  delivery_instructions?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  actual_delivery?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

export interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'points_multiplier';
  value: number;
  minimum_purchase?: number;
  start_date: string;
  end_date: string;
  applicable_categories?: string[];
  applicable_products?: string[];
  usage_limit?: number;
  used_count: number;
}