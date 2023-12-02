'use client';
import Layout from '@/app/components/AdminPage/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function ProductsPage() {
  const [categories, setCategories] = useState([]);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td className="flex gap-4 justify-center">
                <Link href={`/admin/categories/edit/${category._id}`} className="">
                  <img src="/images/fi-sr-pencil.png" className="w-6 h-6" />
                </Link>
                <Link
                  href={`/admin/categories/delete/${category._id}`}
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
