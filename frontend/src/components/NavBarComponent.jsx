// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

//images/logo
import logo from '../assets/logo 1.png';

//Icons
import { CiUser } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';
//clerk
// import {
// 	SignedIn,
// 	SignedOut,
// 	SignInButton,
// 	UserButton,
// } from '@clerk/clerk-react';

//router
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchProductAction } from '../store/productSlice';

function NavBarComponent() {
    const [admin, setAmin] = useState(false);
    const user = JSON.parse(localStorage.getItem('user')) 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [totalProductLs, setTotalProductLs] = useState(0);
    const [searchProducts, setSearchProducts] = useState('');
    const { totalProduct } = useSelector((state) => state.cartStore);
    const { favoriteTotal } = useSelector((state) => state.favoriteStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Luser = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        let lsTotal = JSON.parse(localStorage.getItem('cart_total'));

        if (lsTotal) {
            setTotalProductLs(lsTotal);
        } else {
            setTotalProductLs(0);
        }
    }, [totalProduct]);
    useEffect(() => {
        if (user?.role === 'admin') {
            setAmin(true)}
    }, [user]);

    function handleSearchProducts() {
       
        dispatch(saveSearchProductAction(searchProducts));
        setSearchProducts('');
    }
    const navigationView = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? (
            <div className='flex space-x-2 justify-between items-center '>
                <a className='text-white text-xl'>{user.username}</a>
                <FaChevronDown className='cursor-pointer relative' color='white' onClick={toggleDropdown} />
            </div>
        ) : null;
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const logout = () => {
		setIsDropdownOpen(false)
		localStorage.removeItem('user')
        localStorage.removeItem('cart_total');
        localStorage.removeItem('cart_item');
        localStorage.removeItem('cart_price');
        localStorage.removeItem('token')
        navigate('/')
	}
    const navigated = () => {
      return  <li>
        <a className='block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer' >Dashboard</a>
      </li>
        
    }
    
    return (
        <div className='bg-[#EC4899] lg:h-[100px] h-full flex items-center flex-col  lg:flex-row '>
            <div className='container mx-auto flex items-center justify-between lg:flex-row flex-col gap-[10px] py-[10px] '>
                <NavLink to={admin ? '/dashboard' : '/'}>
                    <img src={logo} alt='logo-image' />
                </NavLink>

                {/*SearchBar*/}
                <div className='flex items-center justify-between bg-textWhite rounded-[20px]'>
                    <input
                        type='text'
                        placeholder='Search any things'
                        className=' bg-transparent outline-none px-[20px] py-[15px] rounded-[20px] placeholder:text-mainYellow text-mainBlue'
                        value={searchProducts}
                        onChange={(e) => setSearchProducts(e.target.value)}
                    />
                    <button className='bg-mainYellow px-[20px] py-[15px] rounded-[20px] text-textWhite' onClick={handleSearchProducts}>
                        Search
                    </button>
                </div>

                {/*loginSystem & cart/Favorite */}
                <div className='flex items-center gap-[15px] justify-end'>
    {!user && (
        <div className='flex items-center gap-[5px] text-textWhite cursor-pointer'>
            <CiUser onClick={() => navigate('authorization')} size={24} color='white' />
        </div>
    )}

                    <div className='flex items-center gap-[5px]'>
                        <CiHeart size={24} color='white' />
                        <span className='bg-mainYellow text-textWhite w-[20px] h-[20px] flex justify-center items-center rounded-[50%]'>
                            {favoriteTotal}
                        </span>
                        <Link to='/favorite' className='text-textWhite text-[18px]'>
                            Favorite
                        </Link>
                    </div>

                    <div className='flex items-center gap-[5px]'>
                        <IoCartOutline size={24} color='white' />
                        <span className='bg-mainYellow text-textWhite w-[20px] h-[20px] flex justify-center items-center rounded-[50%]'>
                            {totalProductLs}
                        </span>
                        <Link to='/cart' className='text-textWhite text-[18px]'>
                            Cart
                        </Link>
                    </div>
                    <div>
                        {navigationView()}
                        {isDropdownOpen ? (
                            <div className='absolute right-3 mt-5 w-64  bg-white border rounded-md shadow-lg'>
                                <ul>
                                     {Luser.role === 'admin' ? navigated() : null}    
                                   
                                    <li>
                                        <a href='#' className='block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer' onClick={logout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBarComponent;
