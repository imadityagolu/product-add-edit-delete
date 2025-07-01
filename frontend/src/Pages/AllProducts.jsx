import { useState, useEffect } from 'react';

function AllProducts() {

  const [products, setProduct] = useState([]);

  const [error, setError] = useState('');

  const [actionMsg, setActionMsg] = useState('');

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  //call server to list products
  const fetchProducts = () => {
    fetch(`${backendurl}/product/list`)
    .then(res => res.json())
    .then(data => { setProduct(data); })
    .catch(error => { setError('Server Response : ' + error.message); });
  };

  //to fetch list of products
  useEffect(() => {
    fetchProducts();
  });

  //call the server to delete product
  const handleDelete = async (id) => {
    setActionMsg('');
    try {
      const res = await fetch(`${backendurl}/product/delete/${id}`, {
        method: 'DELETE' 
      });
      const data = await res.json();
      if(res.ok){
        setActionMsg('Server Response : ' + data.alert);
        setProduct(products.filter(p => p._id !== id));
      } else {
        setActionMsg(data.error || 'Delete failed');
      }
    } catch(error) {
        setActionMsg('Server Error : ' + error.message);
    }
  };

  //to edit
  const startEdit = (product) => {
    setEditId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
    setActionMsg('');
  };

  const handleEditSave = async (id) => {
    setActionMsg('');
    try{
      const res = await fetch(`${backendurl}/product/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:editName, price:Number(editPrice) })
      });

      const data = await res.json();

      if(res.ok){
        setActionMsg('Server Response : ' + data.alert);
        setProduct(products.map(p => p._id === id ? {...p, name:editName, price:editPrice} : p));
        setEditId(null);
      } else {
        setActionMsg(data.error || 'Update Failed');
      }

    } catch(error) {
      setActionMsg('Error : ' + error.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditName('');
    setEditPrice('');
    setActionMsg('');
  };
  
  return (
    <>
    <div>All Products
    {error && <p>{error}</p>}
    <table>
      <thead>
        <tr>
          <th style={{border:'1px solid black'}}>Product Name</th>
          <th style={{border:'1px solid black'}}>Price</th>
          <th style={{border:'1px solid black'}}>Action</th>
        </tr>
      </thead>
      <tbody>
      {products.map(product => (
        <tr key={product._id}>
          <td style={{border:'1px solid black'}}>
            {editId === product._id ? ( <input value={editName} onChange={e => setEditName(e.target.value)}/> ) : ( product.name )}</td>
          <td style={{border:'1px solid black'}}>
            {editId === product._id ? ( <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} /> ) : (`${product.price}`) }</td>
          <td style={{border:'1px solid black'}}>
            {editId === product._id ? (
              <>
                <button onClick={() => handleEditSave(product._id)}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </>
            ) : (
              <>
              <button onClick={() => startEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
              </>
            )}
            
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    {actionMsg && <p>{actionMsg}</p>}
    </div>
    </>
  )
}

export default AllProducts