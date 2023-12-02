'use client';
import Layout from '@/app/components/AdminPage/Layout';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteCategoryPage() {
  const router = useRouter();
  const [categoryInfo, setCategoryInfo] = useState();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get('http://localhost:3000/api/v1/categories/' + id)
      .then((response) => {
        setCategoryInfo(response.data);
      });
  }, [id]);
  function goBack() {
    router.push('/admin/categories');
  }
  function deleteCategory() {
    axios
      .delete('http://localhost:3000/api/v1/categories/' + id)
      .then((response) => {
        goBack();
      });
  }
  return (
    <Layout>
      <h1 className="text-center">
        are you sure want to delete Category "{categoryInfo?.name}" ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-danger" onClick={deleteCategory}>
          Yes
        </button>
        <button className="btn-primary" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
