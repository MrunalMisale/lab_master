import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

function AdminAccess(){
    const role = localStorage.getItem('role');
    return(
        (role==="Admin")?<Outlet></Outlet>:<Navigate to="/login"></Navigate>
    )    
}
export default AdminAccess;