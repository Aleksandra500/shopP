

import { Link } from "react-router-dom";

function HomePage() {
 
 
  
  return (
  
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex items-start justify-center">
      <div className='container mx-auto text-center text-white p-6'>
       <div>
       
       </div>
        <div className="flex flex-col items-center space-y-8 mt-40">
          <h1 className="text-4xl font-bold mb-6">Welcome to Our Product Store</h1>
          <div className="flex gap-4">
            <Link
              to='allProduct'
              className="bg-green-500 text-white py-2 px-6 rounded-full text-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
            >
              All Products
            </Link>
            {/* <Link
              to='addproducts'
              className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
            >
              Add Product
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
