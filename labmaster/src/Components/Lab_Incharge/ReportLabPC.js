import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PC from '../../Assests/PC.png'
import LabInchargeNavBar from "./LabInchargeNavBar";

function ReportLabPC() {

    const [fetched, setFetched] = useState(false);
    const [rows, setRows] = useState(Number);
    const [cols, setCols] = useState(Number);
    const [systems, setSystems] = useState([]);
    const [labinfo, setLabInfo] = useState();
    const [pcClick, setPcClick] = useState(false);
    const [pcinfo, setPcInfo] = useState([]);
    const [currentIssue, setCurrentIssue] = useState([]);
    // const [os, setOs] = useState({ os: "" });
    // const [ram, setRam] = useState({ ram: "" });
    // const [processor, setProcessor] = useState({ processor: "" });
    // const [memory, setMemory] = useState({ memory: "" });
    const [update, setUpdate] = useState(false);
    const [issue, setIssue] = useState(false);
    const [issueDescrip, setIssueDescription] = useState("");
    const [resolvedTab, setResolvedTab] = useState(false);
    const [resolvedIssue, setResolvedIssue] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let result = await fetch(`<--firebase realtime database endpoint address-->sysadmin/configured/${params.id}.json`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json()
        setRows(result.gridARow);
        setCols(result.gridAColumn)
        let personalComputers = result.pc;
        personalComputers = Object.keys(result.pc).map(key => {
            return result.pc[key];
        })
        setLabInfo(result);
        console.log(result.lab_no)
        setFetched(true)
        setSystems(personalComputers);
    }

    function onPcClickHandler(system_info) {
        setPcClick(true)
        setPcInfo(system_info);
        console.log(system_info.pc_no)
        getIssueData(system_info)

    }

    async function getIssueData(system) {
        let result = await fetch(`<--firebase realtime database endpoint address-->sysadmin/configured/${system.lab_no}/pc/${system.pc_no}/issues/currentIssue.json`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json()
        if (result == undefined || result == null) {
            //    return;
        } else {
            let currentIssueSets = Object.keys(result).map(key => {
                return result[key];
            })
            setCurrentIssue(currentIssueSets);
        }
        let res = await fetch(`<--firebase realtime database endpoint address-->sysadmin/configured/${system.lab_no}/pc/${system.pc_no}/issues/resolved.json`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        if (res == undefined || res == null) {
            // return;
        } else {
            res = await res.json();
            let resolvedIssueSets = Object.keys(res).map(key => {
                return res[key];
            })
            setResolvedIssue(resolvedIssueSets);
            console.log(resolvedIssueSets)
        }
    }

    async function onReportHandler() {
        let pc_no = pcinfo.pc_no;
        let issue_no = (pcinfo.issueCount + 1);
        let timestamp = new Date().toISOString().slice(0, 10);
        let issueDescription = issueDescrip
        let issueCount = (pcinfo.issueCount + 1)
        let issueStatus = true;
        let faculty_email = localStorage.getItem('email');
        let reportedBy =localStorage.getItem('username')
        console.log(reportedBy);
        let result = await fetch(`<--Server endpoint address-->incharge/dashboard/lab/${pcinfo.lab_no}`, {
            method: "post",
            body: JSON.stringify({ pc_no, issue_no, timestamp, issueDescription, issueCount, issueStatus, faculty_email, reportedBy }),
            headers: { "Content-Type": "application/json" }
        })
        navigate(0);
    }

    const renderGrid = () => {
        document.documentElement.style.setProperty("--rows", rows);
        document.documentElement.style.setProperty("--cols", cols);

        return systems.map((system, index) =>
            <div key={index} className="grid-item flex flex-col my-auto ml-5 relative "
                style={{ padding: "0px", textAlign: "center", fontSize: "10px" }}
                onClick={() => onPcClickHandler(system)}>
                {system.issueStatus == false && <p className="bg-green-600 w-3 rounded-full h-3 absolute top-2 right-2"></p>}
                {system.issueStatus == true && <p className="bg-red-600 w-3 rounded-full h-3 absolute top-2 right-2"></p>}
                <img src={PC} className="w-16 mx-auto" alt="PC Img"></img>
                <p>{system.pc_no}</p>
            </div>
        )
    };

    return (
        <div className="bg-slate-200 h-screen">
            <LabInchargeNavBar></LabInchargeNavBar>
            <div className="flex w-screen h-5/6">
                <div className="w-2/3 my-auto">
                    {fetched && <div className="grid-container w-fit pr-5 bg-slate-200 shadow-md shadow-slate-400 ml-8 rounded"
                        style={{
                            display: "grid", gridTemplateRows: "repeat(var(--rows),80px)",
                            gridTemplateColumns: "repeat(var(--cols),80px)", gap: "4px", margin: "20px auto 20px auto"
                        }}>
                        {renderGrid()}
                    </div>
                    }
                </div>
                <div className="w-1/3 mx-auto text-center font-light shadow-md shadow-slate-800 rounded-l-3xl ">
                    {fetched && !pcClick && <div className="my-52">
                        <p className="tracking-wider font-medium">Lab No : {labinfo.lab_no}</p>
                        <p className="tracking-wider font-medium">Lab Name : {labinfo.lab_name}</p>
                        <p className="tracking-wider font-medium">Lab Incharge : {labinfo.incharge_name}</p>
                        <p className="tracking-wider font-medium">Total PC's : {labinfo.gridARow * labinfo.gridAColumn}</p>
                    </div>}
                    {fetched && pcClick &&
                        <div>
                            <div className="flex h-48 mx-4">
                                <img src={PC} alt="pclogo"></img>
                                <div className=" my-10 mx-5">
                                    <table className="text-left">
                                        <tbody>
                                            <tr>
                                                <th className="font-medium">Lab No </th>
                                                <td className="px-5">{pcinfo.lab_no}</td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">PC</th>
                                                <td className="px-5">{pcinfo.pc_no}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="shadow-md shadow-slate-800 rounded-t-2xl rounded-b-3xl">
                                <div className="flex">
                                    {/* {console.log(pcinfo)} */}
                                    <p className="px-20 mx-1 rounded-t-2xl active:bg-slate-400" onClick={() => setIssue(false)}>PC Details</p>
                                    <p className="px-20 mx-1 rounded-t-2xl active:bg-slate-400" onClick={() => setIssue(true)}>Issue's</p>
                                </div>
                                {!issue && <div>
                                    {!update && <table className="mx-5 my-5">
                                        <tbody>
                                            <tr>
                                                <th className="font-medium">Operating System</th>
                                                <td className="px-10">
                                                    <input type="text" value={pcinfo.pc_os}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">RAM</th>
                                                <td className="px-10">
                                                    <input type="text" value={pcinfo.pc_ram} ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">Processor</th>
                                                <td className="px-10">
                                                    <input type="text" value={pcinfo.pc_processor} ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">Memory</th>
                                                <td className="px-10">
                                                    <input type="text" value={pcinfo.pc_memory} ></input>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>}

                                   
                                    <p className="mt-28 mb-2 px-4 py-5 rounded-sm text-white">.</p>
                                </div>}
                                {issue &&
                                    <div className="">
                                        <div className="flex justify-around border-black border-t border-b">
                                            <div onClick={() => setResolvedTab(false)}>Report Issue</div>
                                            <div onClick={() => setResolvedTab(true)}>Resolved Issue's</div>
                                        </div>
                                        {!resolvedTab &&
                                            <div>
                                                <div className="flex flex-col mt-5 my-2">
                                                    <label>Report an issue here:</label>
                                                    <textarea type="text" placeholder="List down the issues..." rows="6"
                                                        className="rounded-md mx-5 mb-5 mt-5 p-1 outline-none" style={{ resize: "none" }}
                                                        onChange={(e) => setIssueDescription(e.target.value)}></textarea>
                                                    {!pcinfo.issueStatus ? <button className=" bg-slate-900 w-36 mb-1 text-white rounded-md mx-auto py-1"
                                                        onClick={onReportHandler}>Report Issue</button>
                                                        :
                                                        <button className=" bg-red-600 w-36 mb-1 text-white rounded-md mx-auto py-1">Cannot Report</button>}
                                                </div>
                                            </div>}
                                        {resolvedTab && <div>
                                            {pcinfo.issueStatus &&
                                                <div className="p-4 shadow-md shadow-red-900 bg-red-200 rounded-3xl m-3">
                                                    <p className="text-left ml-4 font-medium">Current Issue Reported:</p>
                                                    {currentIssue.map((item, index) => <p className="text-left ml-4">{item.issueDescription}</p>)}
                                                </div>}
                                            {pcinfo.issueResolved > 0 &&
                                                <div className="overflow-y-auto h-48">
                                                    <p className="font-medium">Issues Resolved:</p>
                                                       {resolvedIssue.map((item, index)=>
                                                        <div className="m-3 rounded-3xl relative shadow-md shadow-green-900">
                                                            <p className="text-left ml-4 font-normal">Issue No. {item.issue_no}</p>
                                                            <p className="text-left ml-4">Issue Reported on {item.timestamp}</p>
                                                            <p className="text-left ml-4">Issue : {item.issueDescription}</p>
                                                            <p className="text-left ml-4 absolute top-2 right-10 bg-green-800 text-white p-1 rounded-md">Resolved!</p>
                                                            <p className="text-left ml-4">Solution: {item.solution}</p>
                                                            <p className="text-left ml-4">Resolved Date: {item.resolvedTimestamp} </p>
                                                       </div>)} 
                                                    
                                                </div>}
                                        </div>}
                                    </div>}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
export default ReportLabPC;