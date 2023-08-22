import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

function InchargeAccess(){
    const role = localStorage.getItem('role');
    return(
        (role==="Incharge")?<Outlet></Outlet>:<Navigate to="/login"></Navigate>
    )    
}
export default InchargeAccess;