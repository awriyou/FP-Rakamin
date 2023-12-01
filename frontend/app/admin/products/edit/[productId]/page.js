'use client';
import Layout from '@/app/components/AdminPage/Layout';
import ProductForm from '@/app/components/AdminPage/ProductForm';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
//   const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/products/' + id)
      .then((response) => {
        setProductInfo(response.data);
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
      <h1>Edit Product</h1>
      {productInfo && (
        <ProductForm {...productInfo} />
      )}
    </Layout>
  );
}
