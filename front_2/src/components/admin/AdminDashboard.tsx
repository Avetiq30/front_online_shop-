import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }
  
const AdminDashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
console.log(products);

    useEffect(() => {
        fetchProducts();
      }, []);

      const fetchProducts = async () => {
        try {
          const response = await axios.get<Product[]>('http://localhost:3000/products');
          setProducts(response.data);
        } catch (error) {
          console.error('Error loading products:', error);
        }
      };
   
    return(
        <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p>Welcome to the administrative panel of the online store. You can manage the following sections:</p>
  
        <h3>Existing Products</h3>
  
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-3">
              <div className="card" style={{ width: '18rem' }}>
              <img src={`http://localhost:3000/${(product.image)}`} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <Link to={`/products/${product._id}`} className="btn btn-primary">
                    Edit Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
   
}

export default AdminDashboard
