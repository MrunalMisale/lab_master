import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
function SystemAdminNavBar(){
    const role = localStorage.getItem('role')
    const navigate = useNavigate();
    function onLogOutHandler(){
        localStorage.clear()
        navigate('/');
    }
    return(
        <div className=" shadow-slate-300 shadow-md
        lg:flex lg:justify-between lg:px-10 lg:py-3">
            <Link to="/system_admin/dashboard">
                <h1 className='text-center text-2xl pt-5 tracking-widest text-gray-800
                lg:text-3xl lg:py-2 lg:mb-0'>
                    LAB MASTER
                </h1>
                <p className='text-center text-sm tracking-wide text-gray-800 mb-1
                lg:-m-2.5'>-System Administrator Portal-</p>
            </Link>
            <ul className="flex justify-end mr-4 space-x-10 font-sans font-extralight text-gray-800 pb-2
            lg:justify-end lg:space-x-20 lg:px-20 lg:py-2.5 lg:text-xl">
                {/* <li className='cursor-pointer'>Log In</li> */}
                <li className='cursor-pointer bg-slate-800 text-slate-200 px-2 py-1 rounded
                lg:bg-transparent lg:text-gray-900' onClick={onLogOutHandler}>Log Out</li>
            </ul>
        </div>
    )
}
export default SystemAdminNavBar;