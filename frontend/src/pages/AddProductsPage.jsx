import { useRef, useState } from "react";
import { addProduct } from "../services/producttService";
import { useDispatch } from 'react-redux';
import { showLoaderAction } from "../store/loaderSlice";
import LoaderComponent from "../components/Loader";
import { toast } from 'react-toastify';
function AddProductsPage() {
  const dispatch = useDispatch()
  const formRef = useRef();
 const [ file, setFile] = useState(null)
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newProduct = { ...product };
    newProduct[id] = value;
    setProduct(newProduct);
  };

  const handleFile = (e) => {

     setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = new FormData();
    newProduct.append('product', JSON.stringify(product));
    newProduct.append('file', file);
    dispatch(showLoaderAction(true))
    const res = await addProduct(newProduct);
    dispatch(showLoaderAction(false))
  
    
    if (res.status === 'success') {
        formRef.current.reset();
        setProduct({
            title: '',
            description: '',
            price: '',
        });
        setFile(null);
        toast.success(res.message)
      
    } else {
      
       toast.error(res.message)
       
    }
   
};

  
    
  

  return (
    <>
  
    <LoaderComponent/>
      <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex justify-center items-start  p-8 ">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2 mt-8">
          <h1 className="text-3xl font-semibold text-blue-800 text-center mb-6">Add Product</h1>
          <form className="space-y-6 " onSubmit={handleSubmit} ref={formRef}>
            <div>
              <label htmlFor="title" className="block text-lg font-medium  text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Type your title"
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Type your description"
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Type your price"
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-lg font-medium text-gray-700">File</label>
              <input
                type="file"
                id="file"
                onChange={handleFile}
                placeholder="Type your price"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductsPage;
