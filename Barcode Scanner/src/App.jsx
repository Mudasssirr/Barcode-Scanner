import React, { useState } from 'react';
import { BarcodeScanner } from './components/BarcodeScanner';
import { ProductInfo } from './components/ProductInfo';
import { Scan } from 'lucide-react';

function App() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBarcodeScan = async (barcodeValue) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcodeValue}.json`
      );
      const data = await response.json();
      // console.log(data);

      if (data.status === 1) {
        setProduct({
          product_name: data.product.product_name || 'Not specified',
          manufacturing_places: data.product.manufacturing_places || 'Not specified',
          countries_sold: data.product.countries_tags ? data.product.countries_tags.map((country) => country.replace(/^en:/, '')).join(', ') : 'Not specified',
          origins: data.product.origins || 'Not specified',
          manufacturing_date: data.product.manufacturing_date || 'Not available',
          expiration_date: data.product.expiration_date || 'Not available',
          image_url: data.product.image_front_small_url || '',
          brands: data.product.brands || 'Unknown Brand',
          quantity: data.product.quantity || 'Not specified',
          calories_100gms: data.product.nutriments["energy-kcal_100g"] || 'Not Specified',
        });
        setError('');
      } else {
        setError('Product not found in database');
        setProduct(null);
      }
    } catch (err) {
      setError('Failed to fetch product information');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Scan className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Scanner</h1>
          <p className="text-gray-600">Scan any product barcode to get detailed information</p>
        </div>

        <div className="flex items-center space-x-1 justify-center mb-4">
          <input
            type="text"
            placeholder="Enter barcode manually"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="p-2 border rounded-l-md w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleBarcodeScan(barcode)}
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Scan
          </button>
        </div>

        <p className='text-center text-xl'>OR</p>

        <BarcodeScanner onResult={handleBarcodeScan} />

        {loading && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Fetching product information...</p>
          </div>
        )}

        <p className="text-gray-600 text-sm text-center mt-3">
          Made by <a className='text-blue-500 underline' href="https://www.linkedin.com/in/muhammad-mudassir-awan-b98147284/" target="_blank" rel="noopener noreferrer">Mudassir Awan</a>
        </p>

        <ProductInfo product={product} error={error} />
      </div>
    </div>
  );
}

export default App;