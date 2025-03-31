import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLoaderAction } from '../../../store/loaderSlice';
import { deleteSingleProduct } from '../../../services/deleteSingleProductService';

function DeleteProductModal({ setIsDeleteModal, currentProduct, fetchProduct }) {
    const dispatch = useDispatch();

    const deleteCurrentProduct = async () => {
        dispatch(showLoaderAction(true));
        const res = await deleteSingleProduct({ productID: currentProduct.id, productImage: currentProduct.image });
        dispatch(showLoaderAction(false));

        if (res.status === "success") {
            setIsDeleteModal(false);
            toast.success(res.message);
            fetchProduct();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Modal
            isOpen={true}
            ariaHideApp={false}
            className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto "
            overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center"
        >
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delete {currentProduct.title} Product</h2>
                <p className="text-lg text-gray-900 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>

                <div className="flex justify-between gap-4">
                    <button
                        className="px-7 py-3 bg-orange-500 text-gray-800 rounded-md hover:bg-gray-400 transition"
                        onClick={() => setIsDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-7 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        onClick={deleteCurrentProduct}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteProductModal;
