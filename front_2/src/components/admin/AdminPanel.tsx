import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">Manage Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/categories">Manage Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/orders">Manage Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/users">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/file">File Uploader</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
