import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryForm({ _id, name: existingName = '' }) {
  const [name, setName] = useState(existingName);
  //   const [categoryInfo, setCategoryInfo] = useState([]);
  const [goToCategories, setGoToCategories] = useState(false);

  //   useEffect(() => {
  //     axios.get('http://localhost:3000/api/v1/categories/').then((response) => {
  //       setCategoryInfo(response.data);
  //     });
  //   }, []);

  const data = { name };

  async function saveCategory(ev) {
    ev.preventDefault();

    // Pastikan bahwa name memiliki nilai sebelum menyimpan
    if (!name) {
      // Handle error, misalnya menampilkan pesan kepada pengguna
      console.error('Name is required.');
      return;
    }

    const jsonData = {
      name: name,
    //   icon: icon, // Gantilah dengan field yang sesuai
    //   color: color, // Gantilah dengan field yang sesuai
    };

    try {
      if (_id) {
        await axios.put(
          `http://localhost:3000/api/v1/categories/${_id}`,
          jsonData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        await axios.post('http://localhost:3000/api/v1/categories/', jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      
      setGoToCategories(true);
    } catch (error) {
      console.error('Error saving category:', error);
      // Handle the error, show a message to the user, etc.
    }
  }

  if (goToCategories) {
    return redirect('/admin/categories');
  }

  return (
    <form onSubmit={saveCategory} encType="multipart/form-data">
      <label>Category Name</label>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />


      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
