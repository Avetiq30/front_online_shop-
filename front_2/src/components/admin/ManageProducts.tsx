import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageProducts.css'
// import { useFileUploader } from './FileUploaderContext';
import { Link } from 'react-router-dom';
import ImageModal from './ImageModal'

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

interface NewProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null; 
}

const ManageProducts: React.FC = () => {
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image:  null, 
  });

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      image:  selectedImages.length > 0 ? selectedImages[0] : null,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/products',
        productData
      );
      setProducts([...products, response.data]);
      setNewProduct((prevNewProduct) => ({
        ...prevNewProduct,
        name: '',
        description: '',
        price: 0,
        category: '',
        image: null
      }));
      console.log('newProduct.image:', newProduct.image);
      console.log('Successful response:', response.status);
    } catch (error) {
      console.error('Error while creating product', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:3000/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    fetchData();
  }, []);
  // console.log('newProduct.image:', newProduct.image);

  const openImageUploadModal = () => {
    setShowImageUploadModal(true);
    
  };
  return (
    <div className="manage-products-container">
      <h3 className="manage-products-title">Adding a new product</h3>
      <form className="manage-products-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
        <label htmlFor="image">Image</label>
        <button onClick={openImageUploadModal}>Choose Image</button>
      
        </div>
        {showImageUploadModal && (
        <ImageModal
          onSelectImage={(selectedImage) => {
            if (selectedImage === null) {
              console.log('Setting image to null');
              setNewProduct({ ...newProduct, image: null });
            } else {
              setSelectedImages([...selectedImages, URL.createObjectURL(selectedImage)]);
              setShowImageUploadModal(false);
            }
          }}
          
          onClose={() => setShowImageUploadModal(false)}
        />
        
      )}
       

        <button onClick={createProduct}>Add product</button>
       
      </form>
    </div>
  );
};

export default ManageProducts;
