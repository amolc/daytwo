import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Product = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        category: '',
        description: ''
    });

    const loadItems = async () => {
        try {
            const response = await api.get('/product/product/');
            setItems(response.data);
        } catch (err) {
            console.error('Error loading products:', err);
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
            await api.post('/product/product/', newItem);
            setNewItem({ name: '', price: '', category: '', description: '' });
            loadItems();
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };

    const deleteItem = async (id) => {
        try {
            await api.delete(`/product/product/${id}/`);
            loadItems();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    return (
        <div className="mt-4">
            <h2>Product Management</h2>
            <div className="card mb-4 mt-3">
                <div className="card-body">
                    <h5 className="card-title">Add New Product</h5>
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
                            <label className="form-label">PRICE</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="price"
                                value={newItem.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">CATEGORY ID</label>
                            <input
                                type="number"
                                className="form-control"
                                name="category"
                                value={newItem.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">DESCRIPTION</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={newItem.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>DESCRIPTION</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${parseFloat(item.price).toFixed(2)}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
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

export default Product;
