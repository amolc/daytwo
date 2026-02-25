import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Customer = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });

    const loadItems = async () => {
        try {
            const response = await api.get('/customer/customer/');
            setItems(response.data);
        } catch (err) {
            console.error('Error loading customers:', err);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const addItem = async (e) => {
        e.preventDefault();
        try {
            await api.post('/customer/customer/', newItem);
            setNewItem({ name: '', email: '', phone: '', address: '', password: '' });
            loadItems();
        } catch (err) {
            console.error('Error adding customer:', err);
        }
    };

    const deleteItem = async (id) => {
        try {
            await api.delete(`/customer/customer/${id}/`);
            loadItems();
        } catch (err) {
            console.error('Error deleting customer:', err);
        }
    };

    return (
        <div className="mt-4">
            <h2>Customer Management</h2>
            <div className="card mb-4 mt-3">
                <div className="card-body">
                    <h5 className="card-title">Add New Customer</h5>
                    <form onSubmit={addItem} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">NAME</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">EMAIL</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={newItem.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">PHONE</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={newItem.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">ADDRESS</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={newItem.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">PASSWORD</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={newItem.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Add Customer</button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>ADDRESS</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customer;
