import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Subscription = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        customer: '',
        product: '',
        quantity: ''
    });

    const loadItems = async () => {
        try {
            const response = await api.get('/subscription/subscription/');
            setItems(response.data);
        } catch (err) {
            console.error('Error loading subscriptions:', err);
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
            await api.post('/subscription/subscription/', newItem);
            setNewItem({ customer: '', product: '', quantity: '' });
            loadItems();
        } catch (err) {
            console.error('Error adding subscription:', err);
        }
    };

    const deleteItem = async (id) => {
        try {
            await api.delete(`/subscription/subscription/${id}/`);
            loadItems();
        } catch (err) {
            console.error('Error deleting subscription:', err);
        }
    };

    return (
        <div className="mt-4">
            <h2>Subscription Management</h2>
            <div className="card mb-4 mt-3">
                <div className="card-body">
                    <h5 className="card-title">Add New Subscription</h5>
                    <form onSubmit={addItem} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">CUSTOMER ID</label>
                            <input
                                type="number"
                                className="form-control"
                                name="customer"
                                value={newItem.customer}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">PRODUCT ID</label>
                            <input
                                type="number"
                                className="form-control"
                                name="product"
                                value={newItem.product}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">QUANTITY</label>
                            <input
                                type="number"
                                className="form-control"
                                name="quantity"
                                value={newItem.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Add Subscription</button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>CUSTOMER ID</th>
                        <th>PRODUCT ID</th>
                        <th>QUANTITY</th>
                        <th>START DATE</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.customer}</td>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>{new Date(item.start_date).toLocaleDateString()}</td>
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

export default Subscription;
