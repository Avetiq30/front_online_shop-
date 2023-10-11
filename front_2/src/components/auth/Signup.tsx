import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 const Signup:React.FC =()=>{

  const [name, setName] = useState('')
  const [lastname,setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/user/register',{
        name,
        lastname,
        email,
        password
      })
      console.log('Successful response:', response.status)
      if(response.status===201){
        alert('Registertaion successful')
        navigate('/login')
      }
    } catch (error) {
      alert('Registertaion faild, try again')
      console.error('Error:', error)
    }
  }


    return <div>
            <h3></h3>
            <section className="vh-100"  onSubmit={handleSubmit} >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
    
                    <form className="mx-1 mx-md-4" >
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" onChange={(e) => setName(e.target.value)}/>
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text"  onChange={(e) => setLastName(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example1c">Your LastName</label>
                  
                        </div>
                      </div>
                     
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="login" onChange={(e) => setEmail(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
            
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                      </div>
    
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
}

export default Signup
