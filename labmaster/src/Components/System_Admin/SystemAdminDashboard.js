import SystemAdminNavBar from "./SystemAdminNavBar";
import Registration from '../../Assests/Registration.png'
import Deletion from '../../Assests/Deletion.png'
import AddLab from '../../Assests/AddLab.png'
import { useNavigate } from "react-router-dom";

function System_AdminDashboard() {
    const navigate = useNavigate();
    
    function goToLabConfiguration(){
        navigate('./labs')
    }

function goToViewConfiguredLab(){
    navigate('./labs/view')
}

    return (
        <div className="bg-slate-200 h-screen">
        <SystemAdminNavBar></SystemAdminNavBar>
        <div className='flex flex-wrap mx-3 my-5 justify-between text-center
            lg:mx-16 lg:my-24'>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly 
                lg:flex lg:flex-row lg:w-1/4  lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToLabConfiguration}>
                    <img src={Registration} alt="logo" className="w-20 mx-auto
                    lg:h-16"></img>
                    <p className='mx-auto lg:my-4 '>Lab Configuration</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                    onClick={goToViewConfiguredLab}>
                    <img src={Deletion} alt="logo" className="w-11/12 mx-auto
                    lg:w-20 lg:-m-2"></img>
                    <p className='mx-auto lg:my-4'>View Configured Lab</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 '
                    >
                </div>
            </div>
        </div>
    )
}
export default System_AdminDashboard;