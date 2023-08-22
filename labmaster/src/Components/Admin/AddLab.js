import React,{useState} from "react";
import AdminNavBar from "./AdminNavBar";
import { useNavigate } from "react-router-dom";

function AddLab() {
    const [lab_no, setLab_no] = useState("");
    const [lab_name, setLab_name] = useState("");
    const [incharge_name, setInchargeName] = useState("");
    const navigate = useNavigate();

    async function onAddLabHandler(event){
        event.preventDefault();
        let result = await fetch("<--Server endpoint address-->admin/dashboard/add-lab",{
            method:"post",
            body:JSON.stringify({lab_no,lab_name, incharge_name}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json();
        console.log(result)
        navigate(0);
    }
    return (
        <div className="bg-slate-200 h-screen">
            <AdminNavBar></AdminNavBar>
            <div className="flex flex-col w-3/4 mx-auto my-28 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
                lg:w-1/4 lg:shadow-md lg:shadow-slate-400 lg:my-20">
                <h1 className="text-center font-light text-2xl text-gray-900">Add Lab</h1>
                <form className="flex flex-col">
                    <label htmlFor="lab_no" className="my-2 font-extralight text-gray-900">Lab No.</label>
                    <input type="text" name="lab_no" onChange={(e)=>setLab_no(e.target.value)} placeholder="Enter Lab No" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                    <label htmlFor="lab_name" className="my-2 font-extralight text-gray-900">Lab Name</label>
                    <input type="text" name="lab_name" onChange={(e)=>setLab_name(e.target.value)} placeholder="Enter Lab Name" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                    <label htmlFor="lab_name" className="my-2 font-extralight text-gray-900">Lab Incharge Assigned</label>
                    <input type="text" name="lab_name" onChange={(e)=>setInchargeName(e.target.value)} placeholder="Enter Incharge Name" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                    <button onClick={onAddLabHandler} className="mt-10 mb-2 font-light bg-gray-900 text-slate-200 py-2 rounded">Add</button>
                </form>
            </div>
        </div>
    )
}
export default AddLab;