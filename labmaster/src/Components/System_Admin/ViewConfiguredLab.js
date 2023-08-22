import React, {useEffect, useState} from "react";
import SystemAdminNavBar from "./SystemAdminNavBar";
import Configure from "../../Assests/Configure.png"
import { useNavigate } from "react-router-dom";

function ViewConfiguredLab() {

    const [labs, setLabs] = useState([]);
    let  myLabs;
    const navigate = useNavigate();
    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData(){
        let result = await fetch("<--firebase realtime database endpoint address-->sysadmin/configured.json",{
            method:"get"
        })
        result= await result.json();
        myLabs = result;
        myLabs = Object.keys(result).map(key => {
            return result[key];
        })
        setLabs(myLabs)
        console.log(myLabs)
    }

    function onViewLabHandler(labno){
        navigate(`/system_admin/dashboard/labs/view/${labno}`)
    }

    return (
        <div className="bg-slate-200 h-screen">
            <SystemAdminNavBar></SystemAdminNavBar>
            <div className="flex flex-col w-3/4 mx-auto my-16 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
                lg:w-1/4 lg:shadow-md lg:shadow-slate-400">
                <h1 className="text-center font-light text-2xl text-gray-900">Labs</h1>
                <table className='my-1 text-gray-900 font-light'>
                    {labs.map((x, id) =>
                        <tbody key={id}>
                            <tr key={id} className="flex justify-between ml-1 my-1 border border-slate-300 shadow-md shadow-slate-300">
                                <td key={id}>
                                    <ul key={id} className="ml-2">
                                        <li className='font-normal'>{x.lab_no}</li>
                                        <li>{x.lab_name}</li>
                                    </ul>
                                </td>
                                <td>
                                    <img src={Configure} alt="logo" 
                                    className="w-8 my-2 mx-2 cursor-pointer"
                                    onClick={()=> onViewLabHandler(x.lab_no)}></img>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}
export default ViewConfiguredLab;