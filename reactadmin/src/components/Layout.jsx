import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('staffUser') || '{}');
    const isLoggedIn = !!localStorage.getItem('staffToken');

    const handleLogout = () => {
        localStorage.removeItem('staffToken');
        localStorage.removeItem('staffUser');
        navigate('/login');
    };

    if (!isLoggedIn) return <>{children}</>;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Milkman Admin</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link" to="/staff">Staff</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/customer">Customers</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/category">Categories</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/product">Products</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/subscription">Subscriptions</Link></li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <span className="nav-link text-light">Welcome, {user.email}</span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container" style={{ marginTop: '80px' }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
