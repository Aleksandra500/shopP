import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import { getSingleProduct } from '../services/getSingleProductService';
import { saveInCartAction } from '../store/cartSlice';
import { updateFavoriteAction } from '../store/favoriteSlice';
import { FaShippingFast, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function SingleProductPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [countProduct, setCountProduct] = useState(1);
    const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);
    const { allFavorite } = useSelector((state) => state.favoriteStore);

    useEffect(() => {
        const fetchSingleProduct = async () => {
            dispatch(showLoaderAction(true));
            const res = await getSingleProduct(id);
            if (res.status === 'success') setProduct(res.product);
            dispatch(showLoaderAction(false));
        };
        fetchSingleProduct();
    }, [dispatch, id]);

    useEffect(() => {
        if (allFavorite.length > 0) {
            allFavorite.forEach((item) => {
                if (item.id === product.id) {
                    setFavoriteIdIcon(item.id);
                }
            });
        } else {
            setFavoriteIdIcon(null);
        }
    }, [allFavorite, product.id]);

    const handleProductCart = () => {
        dispatch(saveInCartAction(product));
    };

    return (
        <div className="container mx-auto p-6 flex flex-col lg:flex-row items-center gap-10">
            {/* Left Side - Product Image */}
            <div className="w-full lg:w-1/2">
            <img 
            src={`https://aleksandrashop.alwaysdata.net/uploads/${product.image}`} 
            className="max-h-[600px] w-full object-contain rounded-lg "
           />
            </div>
            
            {/* Right Side - Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
                <h5 className="text-2xl font-semibold text-gray-700">${product.price}</h5>
                <p className="text-gray-600">{product.description}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-10 mt-2">
                    <p className="text-gray-600">Quantity:</p>
                    <div className="flex items-center border border-gray-400 rounded-md">
                        <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={() => setCountProduct(Math.max(1, countProduct - 1))}>-</button>
                        <span className="px-6 py-2 text-gray-700">{countProduct}</span>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={() => setCountProduct(countProduct + 1)}>+</button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 mt-4">
                    <NavLink to={'/cart'} className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md" onClick={handleProductCart}>
                        Add to Cart
                    </NavLink>
                    <div className="bg-gray-200 p-3 rounded-full cursor-pointer">
                        {favoriteIdIcon === parseInt(id) ? (
                            <FaHeart size={30} className="text-red-500" onClick={() => dispatch(updateFavoriteAction(product))} />
                        ) : (
                            <FaHeart size={30} className="text-gray-500" onClick={() => dispatch(updateFavoriteAction(product))} />
                        )}
                    </div>
                </div>

                {/* Additional Info */}
                <hr className="my-4" />
                <div className="flex items-center gap-4 text-gray-600">
                    <FaShippingFast size={26} />
                    <span>Shipping Information</span>
                </div>
                <p className="text-gray-600 font-semibold">Return Policy</p>
            </div>
        </div>
    );
}

export default SingleProductPage;
