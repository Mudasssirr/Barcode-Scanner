import React from 'react';
import { Package, Calendar, Flag, AlertCircle, Earth, Weight, Factory, BatteryFull } from 'lucide-react';

export const ProductInfo = ({ product, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 p-4 mt-5 rounded-lg text-red-600">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-6">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-48 object-contain mb-4 rounded"
        />
      )}
      
      <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Package className="w-5 h-5 mr-3 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Brand</p>
            <p className="font-medium">{product.brands}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Weight className="w-5 h-5 mr-3 text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Quantity</p>
            <p className="font-medium">{product.quantity}</p>
          </div>
        </div>

        <div className="flex items-center">
          <BatteryFull className="w-5 h-5 mr-3 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Calories (100g)</p>
            <p className="font-medium">{product.calories_100gms}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Earth className="w-5 h-5 mr-3 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Countries where sold</p>
            <p className="font-medium">
            {product.countries_sold || 'Not available'}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Manufacturing Date</p>
            <p className="font-medium">
              {product.manufacturing_date || 'Not available'}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Expiration Date</p>
            <p className="font-medium">
              {product.expiration_date || 'Not available'}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Flag className="w-5 h-5 mr-3 text-pink-500" />
          <div>
            <p className="text-sm text-gray-600">Origin</p>
            <p className="font-medium">
              {product.origins || 'Origin not specified'}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Factory className="w-5 h-5 mr-3 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Manufacturing</p>
            <p className="font-medium">
              {product.manufacturing_places}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
