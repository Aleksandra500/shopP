import { useEffect, useState } from 'react';
import { getAllProduct } from '../../services/getAllProductsService';
import { useDispatch, useSelector } from 'react-redux';
import { showLoaderAction } from '../../store/loaderSlice';
import { saveAllProductsAction } from '../../store/productSlice';
import DeleteProductModal from './modals/DeleteProductModal';
import EditProductModal from './modals/EditProductModal';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


function ManageProducts() {
    const dispatch = useDispatch();
    const { allProducts } = useSelector((state) => state.productStore);
   const [isEditModal, setIsEditModal] = useState(false);
       const [isDeleteModal, setIsDeleteModal] = useState(false);
      const [currentProduct, setCurrentProduct] = useState(null);
   
      const fetchProduct = async () => {
        dispatch(showLoaderAction(true));
        const res = await getAllProduct();
        dispatch(showLoaderAction(false));

        if (res.status === 'success') {
            dispatch(saveAllProductsAction(res.products));
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const editProduct = (product) => {
        setIsEditModal(true);
        setCurrentProduct(product);
    };


    
    const deleteProduct = (product) => {
        setIsDeleteModal(true);
        setCurrentProduct(product);
    };
    return (
        <div className=' bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 '>
            <div className=' max-w-7xl mx-auto p-4'>
                <h1 className='text-2xl text-white font-semibold mb-4'>Manage Products</h1>
                <ul className='space-y-4'>
                    {allProducts.map((product, index) => (
                        <li key={index} className='flex justify-between items-center bg-white p-6 rounded-lg shadow-md'>
                            <div className='mr-4 text-3xl text-pink-600  p-3 rounded-full'>{index + 1}</div>
                            <div className='flex items-center space-x-4'>
                                <img
                                    src={`${BASE_URL}/uploads/${product.image}`}
                                    alt={product.title}
                                    className='w-16 h-22 object-cover rounded-md'
                                />
                                <div> 
                                    <p className='text-lg font-medium text-gray-800'> <span className='text-lg font-bold'>Title: </span> {product.title}</p>
                                    <p className='text-lg font-bold mt-1'>Description:</p>
                                    <p className=' text-lg'>{product.description}</p>
                                    <p className='text-gray-black mt-1'> <span className='text-lg font-bold'>Price:</span> ${product.price}</p>
                                </div>
                            </div>
                            <div className='flex space-x-4'>
                                <button
                                    onClick={() => editProduct(product)}
                                    className='px-4 py-2 bg-orange-400 text-white rounded-lg ml-5 hover:bg-blue-600 transition'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteProduct(product)}
                                    className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div >
            {isDeleteModal &&   <DeleteProductModal  setIsDeleteModal={setIsDeleteModal} currentProduct={currentProduct} fetchProduct={fetchProduct}/>}
            {isEditModal && <EditProductModal setIsEditModal={setIsEditModal} currentProduct={currentProduct} fetchProduct={fetchProduct} />}

            </div>
        </div>
    );
}

export default ManageProducts;
