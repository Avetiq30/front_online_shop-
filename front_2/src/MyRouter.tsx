import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from './Layout/AuthLayout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminPanel from './components/admin/AdminPanel';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageProducts from './components/admin/ManageProducts';
import ManageCategory from './components/admin/ManageCategory';
import EditProduct from './components/admin/EditProduct';
import FileUploader from './components/admin/FileUploader';


export const MyRouter = ()=>{
    return <BrowserRouter>
    <Routes>
        <Route path='' element={<AuthLayout/>} >
            <Route path='/login' element ={<Login/>} />
            <Route path='/register' element ={<Signup/>} />
        </Route>
        <Route path='' element={<AdminPanel/>}>
            <Route index element={<AdminDashboard />} />
            <Route path="/file" element={<FileUploader  />} />
            <Route path='/products' element={<ManageProducts />} />
            <Route path='/categories' element={<ManageCategory />} />
            <Route path="/products/:id" element={<EditProduct  />} />
            {/* <Route path='users' element={<ManageUsers />} /> */}
            {/* <Route path="/categories" element={<ManageCategories />} /> */}
        </Route>
    </Routes>
    </BrowserRouter>
}