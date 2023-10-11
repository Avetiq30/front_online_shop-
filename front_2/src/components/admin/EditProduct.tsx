import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface CategoryModel {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedProduct, setEditedProduct] = useState<Product>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '', 
  });

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const productResponse = await axios.get(`http://localhost:3000/products/${id}`);
          const productData = productResponse.data;
          setEditedProduct({
            ...productData,
          });
        }

        const categoriesResponse = await axios.get('http://localhost:3000/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const updateProduct = async () => {
    try {
      console.log('Sending update request...', editedProduct);

      const response = await axios.put(
        `http://localhost:3000/products/${id}`,
        editedProduct
      );

      console.log('Product updated successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error when updating product', error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageInput = e.target;

    if (imageInput.files && imageInput.files[0]) {
      const formData = new FormData();
      formData.append('file', imageInput.files[0]);

      try {
        const imageResponse = await axios.post(
          'http://localhost:3000/products/upload',
          formData
        );

        console.log('Image uploaded successfully:', imageResponse.data);

        setEditedProduct({
          ...editedProduct,
          image: imageResponse.data.path,
        });
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
  };

  return (
    <div>
      <h3>Edit product</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={editedProduct.category}
            onChange={handleSelectChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
        </div>
        {editedProduct.image && (
          <div className="form-group">
            <img
              src={editedProduct.image}
              alt="Selected Image"
              width="150"
            />
          </div>
        )}
        <button type="button" onClick={updateProduct}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
