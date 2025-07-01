import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [message, setMessage] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage();
        try{

            const res = await fetch(`${backendUrl}/product/add`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ name, price: Number(price) })
            });

            const data = await res.json();

            if(res.ok){
                setMessage('Server Response : '+ data.alert);
                setName('');
                setPrice('');
            } else {
                setMessage('Server Response : ' + data.error || 'Error');
            }

        } catch(error) {
            setMessage('Error : ' + error.message);
        }
    }
  return (
    <div style={{textAlign:'center'}}>
        <form 
        onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder='Enter Product Name'
            required
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <br/>
            <input 
            type='number' 
            placeholder='Enter Product Price' 
            required
            value={price}
            onChange={e => setPrice(e.target.value)}
            />
            <br/>
            <button type="submit"> + Add Product</button>
        </form>
        {message && <p>{message}</p>}
        <br/>
        <Link to="/AllProduct">Show all products</Link>
    </div>
  )
}

export default AddProduct