import React ,{useEffect, useState} from "react";
import AdminNavBar from "./AdminNavBar";
import Delete from '../../Assests/Delete.png'
import { useNavigate } from "react-router-dom";

function DeleteLab() {
    const[labs, setLabs] = useState([]);
    let myData;
    const navigate = useNavigate();
    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData(){
        let res = await fetch("<--firebase realtime database endpoint address-->labs.json", {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        res = await res.json();
        myData = res;
        myData = Object.keys(res).map(key => {
            return res[key];
        })
        setLabs(myData)
    }

    async function onDeleteLabHandler(labno){
        let result = await fetch(`<--Server endpoint address-->admin/dashboard/delete-lab?labno=${labno}`,{
            method: "delete"
        })
        result = await result.json();
        console.log(result)
        navigate(0)
    }

    return (
        <div className="bg-slate-200 h-screen">
            <AdminNavBar></AdminNavBar>
            <div className="flex flex-col w-3/4 mx-auto my-28 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
                lg:w-1/4 lg:shadow-md lg:shadow-slate-400">
                <h1 className="text-center font-light text-2xl text-gray-900">Delete Lab</h1>
                <table className='my-1 text-gray-900 font-light'>
                    {labs.map((x, id) =>
                        <tbody key={id}>
                            <tr key={id} className="flex justify-between ml-1 my-1 border border-slate-300 shadow-md shadow-slate-300 rounded">
                                <td key={id} className="ml-2">
                                    <ul key={id}>
                                        <li className='font-normal'>{x.lab_no}</li>
                                        <li>{x.lab_name}</li>
                                    </ul>
                                </td>
                                <td>
                                    <img src={Delete} alt="logo" 
                                    className="w-12 cursor-pointer"
                                    onClick={()=>onDeleteLabHandler(x.lab_no)}></img>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            </div>
        
    )
}
export default DeleteLab;