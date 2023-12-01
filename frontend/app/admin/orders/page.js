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
  const [orders, setOrders] = useState([])
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
      <Link className="btn-primary" href="/admin/products/new">
        Add new Product
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Price</th>
            <th>Category</th>
            <th>isFeatured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>
                {
                  categories.find(
                    (category) => category._id === product.category
                  )?.name
                }
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
