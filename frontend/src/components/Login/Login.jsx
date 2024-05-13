import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postData = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/loginUser`, {
            email: email,
            password: password
        })
            .then((response) => {
                console.log("response----", response.data);
                const token = response.data.token;
                console.log("token", token);
                if (token) {
                    Cookies.set('token', token);
                    navigate('/wordgame');
                } else {
                    console.error('Token not found in response');
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error);
            });
    }

  return (
    <>
      <div className='container'>
        <div className='form-center'>
          <form className='login-form'>
            <h1>Welcome!</h1>
            <p>We'll never share your email with anyone else.</p>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' autoComplete="new-email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"  name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' autoComplete="new-password" />
            </div>
            <button type="button" onClick={postData} className="btn btn-primary w-100">Submit</button>
            <button type="button" onClick={() => navigate('/registeruser')} className="btn newbtn-secondary w-100">Register here?</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
