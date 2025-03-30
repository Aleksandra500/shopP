import { FiEye } from 'react-icons/fi';
import { FaRegEyeSlash, FaArrowRight } from 'react-icons/fa6';
import { useState } from 'react';
import { chekEmailValidation } from '../utils/chekEmailValidation';
import { register } from '../services/userService';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { showLoginForm } from '../store/loginRegisterSlice';

function RegisterForm() {
    const dispatch = useDispatch();

    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsername, setIsUsername] = useState(true);
    const [isPasswordFilled, setIsPasswordFilled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsEmailFilled(!!data.email);
        setIsUsername(!!data.username);
        setIsPasswordFilled(!!data.password);
        setIsEmailValid(chekEmailValidation(data.email));

        if (!data.email || !data.username || !data.password || !chekEmailValidation(data.email)) return;

        dispatch(showLoaderAction(true));
        const res = await register(data);
        dispatch(showLoaderAction(false));

        if (res.status === 'success') {
            toast.success(res.message);
            dispatch(showLoginForm());
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
            <div className='text-center mb-4 '>
                <h3 className='text-2xl font-semibold'>Welcome</h3>
                <p className='text-gray-600 mt-2'>
                    If you already have an account, please{' '}
                    <span
                        className='text-blue-500 cursor-pointer hover:underline'
                        onClick={() => dispatch(showLoginForm())}
                    >
                        Go to Login <FaArrowRight className='inline' />
                    </span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='email' className={`block text-sm font-medium ${isEmailFilled ? (isEmailValid ? 'text-gray-700' : 'text-red-500') : 'text-red-500'}`}>
                        {isEmailFilled ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                    </label>
                    <input
                        type='text'
                        id='email'
                        placeholder='email@example.com'
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300'
                    />
                </div>
                <div>
                    <label htmlFor='username' className={`block text-sm font-medium ${isUsername ? 'text-gray-700' : 'text-red-500'}`}>
                        {isUsername ? 'Username' : 'Username is required'}
                    </label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter your username'
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300'
                    />
                </div>
                <div className='relative'>
                    <label htmlFor='password' className={`block text-sm font-medium ${isPasswordFilled ? 'text-gray-700' : 'text-red-500'}`}>
                        {isPasswordFilled ? 'Password' : 'Password is required'}
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder='Enter your password'
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
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
