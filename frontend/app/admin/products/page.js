'use client';

import Layout from '@/app/components/AdminPage/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const formatCurrency = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/products').then((response) => {
      setProducts(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories/').then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <Layout>
      {/* <div className="mb-4">Hi Admin</div> */}
      <div className='mb-4'></div>
      <Link className="btn-primary " href="/admin/products/new">
        Add new Product
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>brand</th>
            <th>isFeatured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className='flex items-center'><img src={product.image} className='w-10 h-10'/>{product.name}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>
                {
                  categories.find(
                    (category) => category._id === product.category
                  )?.name
                }
              </td>
              <td>{product.countInStock}</td>
              <td>
                {product.brand}
              </td>
              <td>{product.isFeatured ? 'Yes' : 'No'}</td>
              <td className="flex gap-4 justify-center">
                <Link href={`/admin/products/edit/${product.id}`} className="">
                  <img src="/images/fi-sr-pencil.png" className="w-6 h-6" />
                </Link>
                <Link
                  href={`/admin/products/delete/${product.id}`}
                  className=""
                >
                  <img src="/images/fi-sr-trash.png" className="w-6 h-6" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
