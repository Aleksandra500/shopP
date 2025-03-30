import { Outlet } from 'react-router-dom';
import {  useState } from 'react';
import { getToken } from "./utils/getToken";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//componente
import HeaderComponent from './components/HeaderComponent';
import NavBarComponent from './components/NavBarComponent';


// import CategoryComponent from './components/CategoryComponent';

//axios
import axios from 'axios';
axios.defaults.baseURL='http://localhost:8800';
// axios.defaults.baseURL = 'https://dummyjson.com'


axios.interceptors.request.use(function (config) {
    const token = getToken();
    if(token) config.headers.Authorization = token;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

function App() {
  

    const [activeHeader, setActiveHeader] = useState(true);

    return (
        <>
            <ToastContainer />
            {activeHeader && <HeaderComponent setActiveHeader={setActiveHeader} />}
            <NavBarComponent />
            <Outlet />
        </>
    );
}

export default App;
