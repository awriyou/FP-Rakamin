'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductPage/ProductCard';
import Banner from '@/app/components/ProductPage/Banner';
import BrandFilter from '@/app/components/ProductPage/BrandFilter';
import ButtonGroup from '@/app/components/ProductPage/ButtonGroup';
import axios from 'axios';


const bannerImage = '/images/ProductPage/banner.jpeg';

const ProductPage = () => {
  // State untuk menyimpan produk yang akan ditampilkan
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  // State untuk menyimpan urutan sort
  const [sortOrder, setSortOrder] = useState(null);
  const cart = localStorage.getItem('cart');
  console.log(cart);
  // State untuk menyimpan halaman yang sedang aktif
  const [currentPage, setCurrentPage] = useState(1);

  // Jumlah produk yang ditampilkan per halaman
  const productsPerPage = 8;

  // Fungsi untuk menyortir produk berdasarkan harga
  const sortByPrice = (ascending) => {
    const sorted = [...sortedProducts].sort((a, b) => (
      ascending ? a.price - b.price : b.price - a.price
    ));
    setSortedProducts(sorted);
    setSortOrder(ascending ? 'low' : 'high');
    setCurrentPage(1);
  }; // Reset ke halaman pertama ketika urutan diubah

  // Fungsi untuk mengatur kategori terpilih dan memfilter produk
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1); // Reset ke halaman pertama ketika kategori diubah
  };

  // Menghitung produk yang akan ditampilkan pada halaman saat ini
  const currentProducts = sortedProducts
    .filter(product => !selectedBrand || (selectedBrand === 'All' || product.brand === selectedBrand))
    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Menghitung jumlah total halaman yang diperlukan
  const totalPages = Math.max(Math.ceil(sortedProducts.length / productsPerPage), 1);

  useEffect(() => {
    const fetchData = async () => {
      try {


        // Menggunakan Axios untuk mengambil data dari API produk
        const productsResponse = await axios.get('http://localhost:3000/api/v1/products');
        const productsData = productsResponse.data;

        // Mengatur data produk dan kategori ke state
        setSortedProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="md:mx-auto" style={{ backgroundColor: '#F5F5F5' }}>


      {/* Banner Iklan */}
      <Banner
        imageUrl={bannerImage}
        altText="Advertisement Banner"
        buttonText="Shop Now"
        className="w-full h-auto object-fit-contain"
        style={{ width: '100%' }}
      />
      {/* Banner Iklan */}

      {/* Filter Brands */}
      {/* Filter Brands */}
      <BrandFilter onBrandClick={handleBrandClick} selectedBrand={selectedBrand} />
      {/* Filter Brands */}

      <div className="mx-4 md:mx-auto">
        {/* Dropdown Sort Button */}
        <div className='container mx-auto my-3'>
          <div className="flex justify-end">
            <label htmlFor="sortBy" className="mr-2 py-2">Sort by:</label>
            <select
              id="sortBy"
              onChange={(e) => sortByPrice(e.target.value === 'low')}
              value={sortOrder || ''}
              className="border rounded">
              <option value="low">Lowest Price</option>
              <option value="high">Highest Price</option>
            </select>
          </div>
        </div>
        {/* Dropdown Sort Button */}

        {/* Product Card */}
        <div className='container mx-auto'>
          <div className="flex flex-wrap -mx-2 md:-mx-4">
            {currentProducts.map((product, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 py-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        {/* Product Card */}

        {/* Button Group */}
        {totalPages > 1 && (
          <div className={currentPage === 1 ? '' : 'flex justify-center'}>
            <ButtonGroup currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </div>
        )}
        {/* Button Group */}
      </div>
    </div>
  );
};

export default ProductPage;

