import React, { useEffect, useState } from "react";
import SystemAdminNavBar from "./SystemAdminNavBar";
import { useParams, useNavigate } from "react-router-dom";
function LabConfiguration() {

    const [noOfGrid, setNoOfGrid] = useState(1);
    const [gridARow, setGridARow] = useState(Number);
    const [gridAColumn, setGridAColumn] = useState(Number);
    const [gridBRow, setGridBRow] = useState(Number);
    const [gridBColumn, setGridBColumn] = useState(Number);
    const navigate = useNavigate();
    let params = useParams();

    async function onConfigure1Handler(event) {
        event.preventDefault();
        let res = await fetch(`<--firebase realtime database endpoint address-->labs/${params.id}.json`, {
            method: "get"
        })
        console.log(gridAColumn * gridARow);
        for (let i = 0; i < (gridAColumn * gridARow); i++) {
            if (i < 9) {
                console.log(`PC-0${i + 1}`);
                let configurePc = await fetch(`<--Server endpoint address-->system_admin/dashboard/labs/configure/${params.id}/PC-0${i + 1}`, {
                    method: "post",
                    headers: { "Content-Type": "application/json" }
                })
                configurePc = await configurePc.json();
                console.log(configurePc);
            } else {
                console.log(`PC-${i + 1}`);
                let configurePc = await fetch(`<--Server endpoint address-->system_admin/dashboard/labs/configure/${params.id}/PC-${i + 1}`, {
                    method: "post",
                    headers: { "Content-Type": "application/json" }
                })
                configurePc = await configurePc.json();
                console.log(configurePc);
            }
        }
        res = await res.json()
        let lab_name = res.lab_name;
        let incharge_name = res.incharge_name;
        let result = await fetch(`<--Server endpoint address-->system_admin/dashboard/labs/configure/${params.id}`,{
            method:"post",
            body:JSON.stringify({noOfGrid,gridARow,gridAColumn,lab_name,incharge_name}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json()
        console.log(result);
        navigate(`/system_admin/dashboard/labs/configure/${params.id}/view`)
    }

    async function onConfigure2Handler(event) {
        event.preventDefault();
        console.log(gridARow, gridAColumn, gridBRow, gridBColumn);
    }

    return (
        <div className="bg-slate-200 h-screen">
            <SystemAdminNavBar></SystemAdminNavBar>
            <div className="flex flex-col w-3/4 mx-auto my-10 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
                lg:w-1/4 lg:shadow-md lg:shadow-slate-400">
                <h1 className="text-center font-light text-2xl text-gray-900">Configure Lab Grid</h1>
                <div className="flex flex-col">
                    <select onChange={(e) => { setNoOfGrid(e.target.value) }} className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required>
                        <option value="1" selected>1</option>
                    </select>
                        <div className="flex flex-col">
                            <label htmlFor="text" className="my-2 font-extralight text-gray-900">Grid A - Row</label>
                            <input type="number" name="text" onChange={(e) => setGridARow(e.target.value)} placeholder="Enter no. of rows" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                            <label htmlFor="email" className="my-2 font-extralight text-gray-900">Grid A - Column</label>
                            <input type="number" name="email" onChange={(e) => setGridAColumn(e.target.value)} placeholder="Enter no. of columns" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                            <button onClick={onConfigure1Handler} className="mt-10 mb-2 font-light bg-gray-900 text-slate-200 py-2 rounded">Configure</button>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default LabConfiguration;