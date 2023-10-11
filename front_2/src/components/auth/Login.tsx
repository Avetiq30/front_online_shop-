import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
    
  
try {
    const response = await axios.post('http://localhost:3000/auth/login',{
        email,
        password
    })
    console.log('Successful response:', response.data)
    if(response.status===200){
      navigate('/admin')
    }
} catch (error) {
    console.error('Error:', error);
}
    }
  return <div>

<div>
     <form action="/action_page.php" onSubmit={handleSubmit}>
  <div className="mb-3 mt-3">
    <label htmlFor="email" className="form-label">Email:</label>
    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"  onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="pwd" className="form-label">Password:</label>
    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={(e) => setPassword(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>

  </div>
};

export default Login;
