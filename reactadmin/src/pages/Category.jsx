import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Category = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        description: ''
    });

    const loadItems = async () => {
        try {
            const response = await api.get('/category/category/');
            setItems(response.data);
        } catch (err) {
            console.error('Error loading categories:', err);
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
            await api.post('/category/category/', newItem);
            setNewItem({ name: '', description: '' });
            loadItems();
        } catch (err) {
            console.error('Error adding category:', err);
        }
    };

    const deleteItem = async (id) => {
        try {
            await api.delete(`/category/category/${id}/`);
            loadItems();
        } catch (err) {
            console.error('Error deleting category:', err);
        }
    };

    return (
        <div className="mt-4">
            <h2>Category Management</h2>
            <div className="card mb-4 mt-3">
                <div className="card-body">
                    <h5 className="card-title">Add New Category</h5>
                    <form onSubmit={addItem} className="row g-3">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <label className="form-label">DESCRIPTION</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={newItem.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
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

export default Category;
