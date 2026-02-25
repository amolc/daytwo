import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Staff from './pages/Staff';
import Customer from './pages/Customer';
import Category from './pages/Category';
import Product from './pages/Product';
import Subscription from './pages/Subscription';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('staffToken');
    return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
                    <Route path="/customer" element={<PrivateRoute><Customer /></PrivateRoute>} />
                    <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
                    <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>} />
                    <Route path="/subscription" element={<PrivateRoute><Subscription /></PrivateRoute>} />
                    <Route path="/" element={<Navigate to="/staff" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
