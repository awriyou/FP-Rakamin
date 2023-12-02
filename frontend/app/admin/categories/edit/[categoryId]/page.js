'use client';
import CategoryForm from '@/app/components/AdminPage/CategoryForm';
import Layout from '@/app/components/AdminPage/Layout';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditCategoryPage() {
//   const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/categories/' + id)
      .then((response) => {
        setCategoryInfo(response.data);
      });
  }, [id]);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/v1/categories/').then((response) => {
  //     setCategoryInfo(response.data);
  //   });
  // }, []);

  // const mergeObjects = (obj1, obj2) => {
  // return {
  //   ...obj1,
  //   ...obj2,
  // };
  //   };

  return (
    <Layout>
      <h1>Edit Category Name</h1>
      {categoryInfo && <CategoryForm {...categoryInfo} />}
    </Layout>
  );
}
