import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { showLoaderAction } from '../../../store/loaderSlice';
import { editSingleProduct } from '../../../services/editSingleProductServices';

function EditProductModal({ setIsEditModal, currentProduct, fetchProduct }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [updateProduct, setUpdateProduct] = useState({
        id: currentProduct?.id,
        title: currentProduct?.title,
        description: currentProduct?.description,
        price: currentProduct?.price,
        image: currentProduct?.image,
    });

    const closeEditModel = (e) => {
        e.preventDefault();
        setIsEditModal(false);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const newProduct = { ...updateProduct };
        const { id, value } = e.target;
        newProduct[id] = id === 'price' ? parseInt(value) : value
        setUpdateProduct(newProduct);
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formDataProduct = new FormData();
    
      
        formDataProduct.append('product', JSON.stringify(updateProduct));
    
       
        if (file) {
            formDataProduct.append('file', file);
        }
    
        dispatch(showLoaderAction(true));
        
     
    
        const res = await editSingleProduct(formDataProduct);
        
        dispatch(showLoaderAction(false));
    
        if (res.status === 'success') {
            fetchProduct();
            setIsEditModal(false);
            toast.success(res.message);
        } else {
            setIsEditModal(false);
            toast.warning(res.message);
        }
    };
    
    return (
        <>
       
        <Modal isOpen={true} 
            ariaHideApp={false} 
            centered 
            className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-semibold text-center text-gray-600 mb-6">Edit Product: <span className='text-black'>{currentProduct.title}</span></h3>

                    {/* Title */}
                    <div className='input-wrapper'>
                        <label htmlFor='title' className="block text-lg font-medium text-gray-600">Title</label>
                        <input 
                            className='w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                            type='text' 
                            id='title' 
                            value={updateProduct.title} 
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Description */}
                    <div className='input-wrapper'>
                        <label htmlFor='description' className="block text-lg font-medium text-gray-600">Description</label>
                        <input
                            className='w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            type='text'
                            id='description'
                            value={updateProduct.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Price */}
                    <div className='input-wrapper'>
                        <label htmlFor='price' className="block text-lg font-medium text-gray-600">Price</label>
                        <input 
                            className='w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                            type='number' 
                            id='price' 
                            value={updateProduct.price} 
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Image */}
                    <div className='input-wrapper'>
                        <label htmlFor='image' className="block text-lg font-medium text-gray-600">Image</label>
                        <input 
                            className='w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                            type='file' 
                            id='image' 
                            onChange={handleFile} 
                        />
                    </div>

                    {/* Buttons */}
                    <div className='btns-wrapper flex justify-between mt-6'>
                        <button 
                            className='btn bg-orange-500 hover:bg-gray-700 text-white px-6 py-2 rounded-md focus:outline-none'
                            onClick={closeEditModel}
                        >
                            Cancel
                        </button>
                        <button 
                            className='btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md focus:outline-none'
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
        </>
    );
}

export default EditProductModal;