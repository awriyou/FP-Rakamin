'use client';
import Layout from '@/app/components/AdminPage/Layout';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get('http://localhost:3000/api/v1/products/' + id)
      .then((response) => {
        setProductInfo(response.data);
      });
  }, [id]);
  function goBack() {
    router.push('/admin/products');
  }
  function deleteProduct(){
    axios
      .delete('http://localhost:3000/api/v1/products/' + id)
      .then((response) => {
        goBack();
      });
  }
  return (
    <Layout>
      <h1 className='text-center'>are you sure want to delete "{productInfo?.name}" ?</h1>
      <div className='flex gap-2 justify-center'>
        <button className="btn-danger" onClick={deleteProduct}>Yes</button>
        <button className="btn-primary" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
