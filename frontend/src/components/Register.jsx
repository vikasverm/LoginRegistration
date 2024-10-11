import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/register', { name, email, password, dob })
            .then(result => {
                console.log(result);
                if (result.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff, #0095ff, #2f4dff)" }}>
                <div className="p-5 rounded" style={{ width: '460px', backgroundColor: '#1c1e2a', boxShadow: '0px 0px 15px rgba(0,0,0,0.5)', borderRadius: '8px' }}>
                    <h2 className='mb-4 text-light'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="mb-3 text-start position-relative">
                            <label htmlFor="name" className="form-label text-light">
                                <strong>Name</strong>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark text-light border-0">
                                    <i className="fas fa-user"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control bg-dark text-light border-0" 
                                    id="name" 
                                    placeholder="Enter Name" 
                                    onChange={(event) => setName(event.target.value)} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3 text-start position-relative">
                            <label htmlFor="email" className="form-label text-light">
                                <strong>Email Id</strong>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark text-light border-0">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input 
                                    type="email" 
                                    className="form-control bg-dark text-light border-0" 
                                    id="email" 
                                    placeholder="Enter Email" 
                                    onChange={(event) => setEmail(event.target.value)} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3 text-start position-relative">
                            <label htmlFor="dob" className="form-label text-light">
                                <strong>Date of Birth</strong>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark text-light border-0">
                                    <i className="fas fa-calendar"></i>
                                </span>
                                <input 
                                    type="date" 
                                    className="form-control bg-dark text-light border-0" 
                                    id="dob" 
                                    onChange={(event) => setDob(event.target.value)} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3 text-start position-relative">
                            <label htmlFor="password" className="form-label text-light">
                                <strong>Password</strong>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark text-light border-0">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input 
                                    type="password" 
                                    className="form-control bg-dark text-light border-0" 
                                    id="password" 
                                    placeholder="Enter Password" 
                                    onChange={(event) => setPassword(event.target.value)} 
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-info w-100 mt-4">Register</button>
                    </form>

                    <p className='mt-3 text-light'>Already have an account? 
                        <Link to='/login' className="text-info ms-1">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
