'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Cart = () => {
  const [editedAddress, setEditedAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    province: '',
    phone: '',
  });
  const data = JSON.parse(localStorage.getItem('cart'));
  console.log('data cart:', data);

  const extractedData = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      const { quantity, productId } = item;
      extractedData.push({ quantity, productId });
    }
  }

  console.log('Extracted Data:', extractedData);
  const [cartData, setCartData] = useState([]);
  const [reloadCount, setReloadCount] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [productDetails, setProductDetails] = useState({});
  const [quantityInput, setQuantityInput] = useState(0);
  const [confirmationProductId, setConfirmationProductId] = useState(null);
  const [isInputChanged, setIsInputChanged] = useState(false);

  useEffect(() => {
    window.addEventListener('load', fetchCartData);
    fetchCartData();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUser(response.data);

        // Set editedAddress after user data is fetched
        setEditedAddress({
          address: response.data.address || '',
          city: response.data.city || '',
          postalCode: response.data.postalCode || '',
          province: response.data.province || '',
          phone: response.data.phone || '',
          orderItems: response.data.orderItems || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [reloadCount]);

  console.log(user);

  const totalPrice = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);

  console.log(userId);
  console.log(token);
  console.log(editedAddress);
  const dataqq = extractedData.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  console.log('aatat', dataqq);
  const orderItemsArray = dataqq.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
  const handleSaveOrder = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: orderItemsArray.map((item) => ({
            quantity: item.quantity,
            product: item.productId,
          })),
          userId: userId,
          shippingAddress1: editedAddress.address,
          city: editedAddress.city,
          postalCode: editedAddress.postalCode,
          province: editedAddress.province,
          phone: editedAddress.phone,
          user: userId,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        router.push(`/${userId}/pages/order`);
        console.log('Order saved:', data);
        localStorage.removeItem('cart');
      } else {
        console.error('Error saving order:', data.error);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const renderShippingAddress = () => {
    return (
      <div className='shipping-address'>
        <h2 className='text-xl font-bold mb-4' style={{ color: '#488BA8' }}>
          Alamat Pengiriman
        </h2>
        <form className='space-y-4'>
          <div className='flex space-x-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700'>Alamat:</label>
              <input
                type='text'
                className='mt-1 p-2 border border-gray-300 rounded-md w-full'
                value={editedAddress.address}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700'>Kota:</label>
              <input type='text' className='mt-1 p-2 border border-gray-300 rounded-md w-full' value={editedAddress.city} onChange={(e) => setEditedAddress({ ...editedAddress, city: e.target.value })} />
            </div>
          </div>

          <div className='flex space-x-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700'>Kode Pos:</label>
              <input
                type='text'
                className='mt-1 p-2 border border-gray-300 rounded-md w-full'
                value={editedAddress.postalCode}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700'>Provinsi:</label>
              <input
                type='text'
                className='mt-1 p-2 border border-gray-300 rounded-md w-full'
                value={editedAddress.province}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    province: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700'>Nomor Telepon:</label>
            <input type='text' className='mt-1 p-2 border border-gray-300 rounded-md w-full' value={editedAddress.phone} onChange={(e) => setEditedAddress({ ...editedAddress, phone: e.target.value })} />
          </div>
        </form>
      </div>
    );
  };

  const fetchCartData = () => {
    try {
      const storedCartData = localStorage.getItem('cart');
      if (storedCartData) {
        const parsedCartData = JSON.parse(storedCartData);
        const cartArray = Object.values(parsedCartData);

        if (Array.isArray(cartArray)) {
          setCartData(cartArray);
        } else {
          console.error('Invalid cart data format:', parsedCartData);
        }
      }
    } catch (error) {
      console.error('Error parsing cart data:', error);
    }
  };

  const handleQuantityChange = (e, productId) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const step = e.key === 'ArrowUp' ? 1 : -1;
      const currentQuantity = cartData.find((item) => item.productId === productId)?.quantity;
      const quantityValue = Math.max(0, currentQuantity + step);
      if (quantityValue === 0) {
        handleRemoveItem(productId);
      } else {
        // Update the quantity and confirm it
        setQuantityInput(quantityValue);
        handleConfirmQuantity(productId, quantityValue);
        setIsInputChanged(true);
      }
    }
  };

  const handleConfirmQuantity = (productId, quantityValue) => {
    const updatedCartData = cartData.map((item) => {
      if (item.productId === productId) {
        item.quantity = quantityValue;
      }
      return item;
    });

    setCartData(updatedCartData);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
    setConfirmationProductId(productId);

    setIsInputChanged(false);

    setTimeout(() => {
      setConfirmationProductId(null);
    }, 3000);
  };

  const handleReload = () => {
    setReloadCount(1);

    setTimeout(() => {
      router.reload();
    }, 2000);
  };

  const handleRemoveItem = (productId) => {
    // Check if quantity is 0
    const currentQuantity = cartData.find((item) => item.productId === productId)?.quantity;

    const confirmationMessage = 'Apakah Anda yakin ingin menghapus produk ini dari keranjang?';

    if (currentQuantity === 0 || window.confirm(confirmationMessage)) {
      // Proceed with removing the item
      const updatedCartData = cartData.filter((item) => item.productId !== productId);
      setCartData(updatedCartData);

      const updatedCart = {};
      updatedCartData.forEach((item) => {
        updatedCart[`${item.userId}_${item.productId}`] = item;
      });

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setConfirmationProductId(productId);
    }
  };

  const renderCartItem = (cartItem) => {
    const { productId, name, price, quantity, image } = cartItem;

    return (
      <div className='flex p-4 mt-4 max-w-4xl mx-auto align-relative rounded-md '>
        <div key={productId} className='cart-item flex w-full'>
          <div className='flex-shrink-0 mr-4 rounded-md shadow'>
            <img src={image} className='w-64 h-64 object-cover' />
          </div>
          <div className='flex-1 bg-white p-6 rounded-md shadow '>
            <div className='mb-4'>
              <p className='text-xl font-bold mb-2'>{name}</p>
              <p className='text-base'>
                Harga:{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(price)}
              </p>
            </div>

            <div className='quantity-input mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Quantity:</label>
              <input type='number' value={quantity} onChange={(e) => setQuantityInput(e.target.value)} onKeyDown={(e) => handleQuantityChange(e, productId)} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
              <p className='mt-2'>
                Total Harga:{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(price * quantity)}
              </p>
            </div>

            <button onClick={() => handleRemoveItem(productId)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Remove Item
            </button>

            {confirmationProductId === productId && <p className='confirmation-message text-green-500'>Quantity updated successfully</p>}
          </div>
        </div>
      </div>
    );
  };

  // ...

  const handleOrderConfirmation = () => {
    const confirmationMessage = 'Apakah Anda yakin ingin menyelesaikan pesanan?';
    const isConfirmed = window.confirm(confirmationMessage);

    if (isConfirmed) {
      handleSaveOrder();
    }
  };

  return (
    <div className='cart container mx-auto px-4 py-16 relative rounded border'>
      <div className='cart-content p-4 max-w-4xl mx-auto align-middle'>
        {/* <h1
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "#488BA8" }}
        >
          Cart
        </h1> */}
        {cartData.length === 0 ? (
          <div className='flex justify-center items-center h-full text-center'>
            <p className='font-bold mb-4 ' style={{ color: '#488BA8' }}>
              Cart is empty.
            </p>
          </div>
        ) : (
          <div>
            {renderShippingAddress()}
            <div className='w-full pr-4'>{cartData.map(renderCartItem)}</div>
            <div className='fixed bottom-0 left-0 right-0 h-16 bg-gray-200 border border-gray-300 p-4 flex justify-between items-center shadow'>
              <div className='w-1/2 pr-4'>
                <div className='flex justify-between items-center'>
                  <label className='block text-sm font-medium text-gray-700 w-1/2'>Total Quantity</label>
                  <p className='block text-sm font-medium text-gray-700 w-1/2 align-right '>{totalQuantity}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <label className='block text-sm font-medium text-gray-700 text-bold '>Total Harga</label>
                  <p className='block text-sm font-medium text-gray-700 align-right text-bold w-1/2 '>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(totalPrice)}
                  </p>
                </div>
              </div>
              <div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleOrderConfirmation}>
                  Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
