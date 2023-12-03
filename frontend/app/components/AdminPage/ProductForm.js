'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function ProductForm({
  _id,
  name: existingName = '',
  description: existingDescription = '',
  price: existingPrice = '',
  category: existingCategory = '',
  images,
}) {
  const [name, setName] = useState(existingName);
  const [description, setDescription] = useState(existingDescription);
  const [price, setPrice] = useState(existingPrice);
  const [category, setCategory] = useState(existingCategory || '');
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [countInStock, setCountInStock] = useState();
  const [brand, setBrand] = useState();
  const [categoryId, setCategoryId] = useState(
    existingCategory ? existingCategory._id : ''
  );
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [goToProducts, setGoToProducts] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories/').then((response) => {
      setCategoryInfo(response.data);
    });
  }, []);

  const data = { name, description, price, category, image, brand };

  function uploadImage(ev) {
    const file = ev.target?.files[0];

    if (file) {
      // Simpan file gambar ke dalam state
      setImageFile(file);
    }
  }
  async function saveProduct(ev) {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('countInStock', countInStock);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (_id) {
      await axios.put('http://localhost:3000/api/v1/products/' + _id, {
        ...data,
      });
    } else {
      await axios.post('http://localhost:3000/api/v1/products', formData);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    return redirect('/admin/products');
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <label>Photo</label>
      <div className="mb-3">
        {!images?.length && !imageFile && (
          <div>
            <label className="cursor-pointer text-sm text-gray-500 bg-gray-100 rounded-sm w-24 h-24 border flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Upload</div>
              <input type="file" onChange={uploadImage} className="hidden " />
            </label>
            No Photos in this product
          </div>
        )}
        {images?.length > 0 && <div>Existing Photos in this product</div>}
        {imageFile && <div>New Photo selected for upload</div>}
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description Product"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Stock</label>
      <input
        type="number"
        placeholder="Stock"
        value={countInStock}
        onChange={(ev) => setCountInStock(ev.target.value)}
      />

      <label>Price</label>
      <input
        type="number"
        placeholder="Price in rupiah"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <div className="my-6   ">
        <label>Brand</label>
        <select
          value={brand}
          onChange={(ev) => setBrand(ev.target.value)}
          className="p-2 border-2 ml-2"
        >
          <option value="">Select brand</option>
          <option value="Acer">Acer</option>
          <option value="Asus">Asus</option>
          <option value="Apple">Apple</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Hp">HP</option>
          <option value="otherbrand">Other Brand</option>
        </select>
      </div>

      <div className="my-4 ">
        <label>Category : </label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          className="p-2 border-2 ml-2"
        >
          <option value={categoryId} disabled>
            Select a category
          </option>
          {categoryInfo.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
