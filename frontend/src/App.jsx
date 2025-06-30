import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import First from './Pages/First';
import AddProduct from './Pages/AddProduct';
import AllProducts from './Pages/AllProducts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <First/>,

    children:[
      {
        index: true,
        element: <AddProduct/>
      },
      {
      path: "/AllProduct",
      element: <AllProducts/>
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
