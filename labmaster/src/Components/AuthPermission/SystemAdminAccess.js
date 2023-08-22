import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

function SystemAdminAccess(){
    const role = localStorage.getItem('role');
    return(
        (role==="Tech")?<Outlet></Outlet>:<Navigate to="/login"></Navigate>
    )    
}
export default SystemAdminAccess;