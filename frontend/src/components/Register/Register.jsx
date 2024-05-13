import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    const postData = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/registerUser`, {
            username: username,
            email: email,
            mobile:mobile,
            password: password
        })
            .then((response) => {
                console.log("response----", response.data);
                const token = response.data.data.token;
                const username = response.data.data.username;
                console.log("username", username);
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
        <div className='container'>
            <div className='form-center'>
                <form className='login-form'>
                    <h1>Welcome!</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" name="username" onChange={(e) => setUsername(e.target.value)} placeholder='Username' autoComplete="new-username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' autoComplete="new-email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputContactNo" className="form-label">Contact No</label>
                        <input type="text" className="form-control" id="exampleInputContactNo" name="mobile" onChange={(e) => setMobile(e.target.value)}  placeholder='Contact No' autoComplete="new-contact" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' autoComplete="new-password" />
                    </div>
                    <button type="button" onClick={postData} className="btn btn-primary w-100 mb-3">Register</button>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary w-100">Already have an account? Login</button>
                </form>
            </div>
        </div>
    );
};

export default Register;







// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import "./Register.css";

// const Register = () => {
//   const navigate = useNavigate(); // Initialize navigate

//   const handleSubmit = () => {
//     // Perform form submission logic
//     // For now, let's just navigate to the login page
//     navigate('/'); // Use navigate to redirect
//   };

//   return (
//     <div className='container'>
//       <div className='form-center'>
//         <form className='login-form'>
//           <h1>Welcome!</h1>
//           <div className="mb-3">
//             <label htmlFor="exampleInputUsername" className="form-label">Username</label>
//             <input type="text" className="form-control" id="exampleInputUsername" placeholder='Username' autoComplete="new-username" />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
//             <input type="email" className="form-control" id="exampleInputEmail" placeholder='Email Address' autoComplete="new-email" />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputContactNo" className="form-label">Contact No</label>
//             <input type="text" className="form-control" id="exampleInputContactNo" placeholder='Contact No' autoComplete="new-contact" />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword" className="form-label">Password</label>
//             <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Password' autoComplete="new-password" />
//           </div>
//           <button type="button" onClick={handleSubmit} className="btn btn-primary w-100 mb-3">Register</button>
//           <button type="button" onClick={() => navigate('/')} className="btn btn-secondary w-100">Already have an account? Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
