import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/login', { email, password })
        .then(result => {
            console.log(result);
            if (result.data.message === "Success") {
                localStorage.setItem('token', result.data.token); // Store JWT
                alert('Login successful!');
                navigate('/home');
            } else {
                alert(result.data);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100 gradient-custom w-100" 
                style={{backgroundImage: "linear-gradient( #2f4dff,#00d5ff, #0075ff)"}}>
                    
                <div style={{ width: '420px', backgroundColor: '#1c1e2a', boxShadow: '0px 0px 15px rgba(0,0,0,0.5)', borderRadius: '8px', position: 'relative' }}>
                    
                    {/* Register Button positioned absolutely */}
                    <Link to='/register' className="btn btn-info w-50 " style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
                        Register
                    </Link>

                    <div className='p-5'>
                        <h2 className="mb-4 text-light">Sign In</h2>
                        <span className=''>
    <i className="bi bi-person-circle" style={{ fontSize: '90px', color: 'grey' }}></i>
</span>                      <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start position-relative">
                                <label htmlFor="username" className="form-label text-light">
                                    Username
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-dark text-light border-0">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your username" 
                                        className="form-control bg-dark text-light border-0" 
                                        id="username" 
                                        onChange={(event) => setEmail(event.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="mb-3 text-start position-relative">
                                <label htmlFor="password" className="form-label text-light">
                                    Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-dark text-light border-0">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        className="form-control bg-dark text-light border-0" 
                                        id="password" 
                                        onChange={(event) => setPassword(event.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <input type="checkbox" id="rememberMe" className="form-check-input"/>
                                    <label htmlFor="rememberMe" className="form-check-label text-light">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className="text-light" style={{ fontSize: '0.9rem' }}>Forgot password?</Link>
                            </div>
                            <button type="submit" className="btn btn-info w-100 mt-4">Login</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login;
