'use client';
import CategoryForm from '@/app/components/AdminPage/CategoryForm';
import Layout from '@/app/components/AdminPage/Layout';



// import '@/app/styles/global.css'

export default function NewCategoryPage() {
  return (
    <Layout>
      <h1>New Category</h1>
      <CategoryForm />
    </Layout>
  );
}
