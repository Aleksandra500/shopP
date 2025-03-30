import { FaArrowRight, FaRegEyeSlash } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showRegisterForm } from '../store/loginRegisterSlice';
import { chekEmailValidation } from '../utils/chekEmailValidation';
import { login } from '../services/userService';
import { showLoaderAction } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { setUserAction } from '../store/userSlice';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isEmail, setIsEmail] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEmail(!!data.email);
        setIsPassword(!!data.password);
        setIsEmailValid(chekEmailValidation(data.email));

        if (!data.email || !data.password || !chekEmailValidation(data.email)) return;
        
        dispatch(showLoaderAction(true));
        const res = await login(data);
        dispatch(showLoaderAction(false));

        if (res.status === 'success') {
            localStorage.setItem("user", JSON.stringify(res.user))
            localStorage.setItem('token', res.token)
            dispatch(setUserAction(res.user));
            
            if(res.user.role === 'admin'){
                navigate('/dashboard')}
                
                else{
                    navigate('/')
                }
            
           
            toast.success(res.message)
            
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className='max-w-md mx-auto mt-14 bg-white p-6 rounded-lg shadow-md'>
            <div className='text-center mb-4'>
                <h3 className='text-2xl font-semibold'>Welcome back!</h3>
                <p className='text-gray-600 mt-2'>
                If you don’t have an account yet, sign up and join us.{' '}
                    <span
                        className='text-blue-500 cursor-pointer hover:underline flex items-center justify-center gap-1'
                        onClick={() => dispatch(showRegisterForm())}
                    >
                        Go to Register <FaArrowRight />
                    </span>
                </p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='email' className={`block text-sm font-medium ${isEmail ? (isEmailValid ? 'text-gray-700' : 'text-red-500') : 'text-red-500'}`}>
                        {isEmail ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                    </label>
                    <input
                        type='text'
                        id='email'
                        placeholder='email@example.com'
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300'
                    />
                </div>
                <div className='relative'>
                    <label htmlFor='password' className={`block text-sm font-medium ${isPassword ? 'text-gray-700' : 'text-red-500'}`}>
                        {isPassword ? 'Password' : 'Password is required'}
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder='Type your password'
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300'
                    />
                    <span
                        className='absolute inset-y-0 right-2 top-4 flex items-center cursor-pointer text-gray-500'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEye /> : <FaRegEyeSlash />}
                    </span>
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition'
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
