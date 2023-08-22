import AdminNavBar from "../Admin/AdminNavBar";
import Registration from '../../Assests/Registration.png'
import {  useNavigate } from "react-router-dom";
import LabInchargeNavBar from "./LabInchargeNavBar";
function Lab_InchargeDashboard() {
    const navigate = useNavigate()

    function goToViewLab(){
        navigate("./view")
    }

    function goToReportLab(){
        navigate("./lab")
    }

    return (
        <div className="bg-slate-200 h-screen">
            <LabInchargeNavBar></LabInchargeNavBar>
            <div className='flex flex-wrap mx-3 my-5 justify-between text-center
            lg:mx-16 lg:my-24'>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly 
                lg:flex lg:flex-row lg:w-1/4  lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                onClick={goToViewLab}
                >
                    <img src={Registration} alt="logo" className="w-20
                    lg:h-16"></img>
                    <p className='lg:my-4'>View Lab</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly 
                lg:flex lg:flex-row lg:w-1/4  lg:p-3 lg:shadow-sm lg:shadow-gray-600 rounded'
                onClick={goToReportLab}
                >
                    <img src={Registration} alt="logo" className="w-20
                    lg:h-16"></img>
                    <p className='lg:my-4'>Report Lab Issue</p>
                </div>
                <div className='w-1/4 m-1 mb-3 flex flex-col justify-evenly
                lg:flex lg:flex-row lg:w-1/4 lg:p-3 '
                    >
                </div>
            </div>
        </div>
    )
}
export default Lab_InchargeDashboard;