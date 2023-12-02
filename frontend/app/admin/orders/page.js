"use client"
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

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/orders/').then((response) => {
      setOrders(response.data);
    });
  }, []);

  // console.log(orders.id)
  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>Id Order</th>
            <th>Products</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.orderItems.map((orderItem) => (
                  <div key={orderItem.id}>
                    <p>Product: {orderItem.product?.name}</p>
                    <p>Category: {orderItem.product?.category?.name}</p>
                    <p>Quantity: {orderItem.quantity}</p>
                  </div>
                ))}
              </td>
              <td>{order.dateOrdered}</td>
              <td>{order.user?.name}</td>
              <td>{formatCurrency(order.totalPrice)}</td>
              <td>{/* Add payment info here */}</td>
              <td>{order.status}</td>
              <td className="flex gap-4 justify-center">
                <Link href={`/admin/orders/edit/${order.id}`}>
                  <img src="/images/fi-sr-pencil.png" className="w-6 h-6" />
                </Link>
                <Link href={`/admin/orders/delete/${order.id}`}>
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
