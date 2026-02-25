import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('staffToken')) {
            navigate('/staff');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/staff/login/', { email, password });
            const { token, staff_id } = response.data;
            localStorage.setItem('staffToken', token);
            localStorage.setItem('staffUser', JSON.stringify({ email, id: staff_id }));
            navigate('/staff');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
            <div className="card shadow">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Staff Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
