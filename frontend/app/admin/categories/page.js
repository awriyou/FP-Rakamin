'use client';

import Layout from '@/app/components/AdminPage/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// const formatCurrency = (number) => {
//   return new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(number);
// };

export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:3000/api/v1/products').then((response) => {
//       setProducts(response.data);
//     });
//   }, []);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories/').then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <Layout>
      <div className="mb-4"></div>
      <Link className="btn-primary" href="/admin/categories/new">
        Add new Category
      </Link>
      <table>
        <thead>
          <tr>
            <th>Id Categories</th>
            <th>Name Categories</th>
            {/* <th>Category</th>
            <th>isFeatured</th>
            <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
