import React from 'react'
import AdminNavBar from './AdminNavBar';
import Registration from '../../Assests/Registration.png'
import Deletion from '../../Assests/Deletion.png'
import AddLab from '../../Assests/AddLab.png'
import DeleteLab from '../../Assests/DeleteLab.png'
import ViewLab from '../../Assests/ViewLab.png'
import ReportLabIssue from '../../Assests/ReportLabIssue.png'
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
    const navigate = useNavigate();
    function goToEnrollUser(){
        navigate('./enroll-user')
    }

    function goToDeleteUser(){
        navigate('./delete-user')
    }

    function goToAddLab(){
        navigate('./add-lab')
    }
    
    function goToDeleteLab(){
        navigate('./delete-lab')
    }

    function goToViewLab(){
        navigate('./view-lab')
    }

    function goToReportGeneration(){
        navigate('./report')
    }

    return (
        <div className="bg-slate-200 h-screen">
            <AdminNavBar></AdminNavBar>
            <div className='flex flex-wrap mx-3 my-5 justify-between text-center
            lg:mx-16 lg:my-24'>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly 
                lg:flex lg:flex-row lg:w-1/4  lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToEnrollUser}>
                    <img src={Registration} alt="logo" className="w-20
                    lg:h-16"></img>
                    <p className='lg:my-4'>Enroll User</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToDeleteUser}>
                    <img src={Deletion} alt="logo" className="w-11/12
                    lg:w-20 lg:-m-2"></img>
                    <p className='lg:my-4'>Delete User</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToAddLab}>
                    <img src={AddLab} alt="logo" className="w-11/12
                    lg:w-20 h-16"></img>
                    <p className='mr-2 lg:my-4'>Add Lab</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToDeleteLab}>
                    <img src={DeleteLab} alt="logo" className="w-20"></img>
                    <p className='lg:my-4'>Delete Lab</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToViewLab}>
                    <img src={ViewLab} alt="logo" className="w-20"></img>
                    <p className='lg:my-4'>View Lab</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                onClick={goToReportGeneration}>
                    <img src={ReportLabIssue} alt="logo" className="w-20"></img>
                    <p className='lg:my-4'>Report</p>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;