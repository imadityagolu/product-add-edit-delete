import { useState, useEffect } from 'react';

function AllProducts() {

  const [products, setProduct] = useState([]);
  const [error, setError] = useState('');

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = () => {
    fetch(`${backendurl}/product/list`)
    .then(res => res.json())
    .then(data => {
      setProduct(data);
    })
    .catch(error => {
      setError('Failed to fetch product data : ' + error.message);
    });
  };

  useEffect(() => {
    fetchProducts();
  });
  
  return (
    <>
    <div>All Products</div>
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
        <tr>
          <td style={{border:'1px solid black'}}>{product.name}</td>
          <td style={{border:'1px solid black'}}>${product.price}</td>
          <td style={{border:'1px solid black'}}><button type="submit">Edit</button></td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  )
}

export default AllProducts