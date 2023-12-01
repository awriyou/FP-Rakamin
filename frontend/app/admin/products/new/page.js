'use client';
import Layout from '@/app/components/AdminPage/Layout';
import ProductForm from '@/app/components/AdminPage/ProductForm';
import axios from 'axios';
import { useEffect, useState } from 'react';

// import '@/app/styles/global.css'

export default function NewProductPage() {
    

  return (
    <Layout>
    <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
