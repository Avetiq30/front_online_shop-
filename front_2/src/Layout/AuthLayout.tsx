import { Link, Outlet } from  'react-router-dom'


 const AuthLayout: React.FC = () => {
    return (
         <div>
        <div>
        <nav className="navbar navbar-expand-sm bg-dark">

        <div className="container-fluid">
   
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Login</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-white" to="/register">Signup</Link>
        </li>
       
    </ul>
  </div>

</nav>
</div>
<div className="container">
    <Outlet/>
</div>
    </div>
    );
  };

  export default AuthLayout