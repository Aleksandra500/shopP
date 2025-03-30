import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginFormComponent'
import RegisterForm from '../components/RegisterFormComponent'
function AuthorizationPage() {
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore);

    return (
        <div className='min-h-screen flex bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 '>
           <div className='container mx-auto items-center justify-center'>
            <div className='authorization-wrapper mt-16 '>{isLoginForm ? <LoginForm/> : <RegisterForm/>}</div>
           </div>
        </div>
    );
}

export default AuthorizationPage;