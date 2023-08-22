import React, { useEffect, useState } from "react";
import SystemAdminNavBar from "./SystemAdminNavBar";
import { useNavigate, useParams } from "react-router-dom";
import PC from '../../Assests/PC.png'

function ViewEditLab() {

    const [fetched, setFetched] = useState(false);
    const [rows, setRows] = useState(Number);
    const [cols, setCols] = useState(Number);
    const [systems, setSystems] = useState([]);
    const [labinfo, setLabInfo] = useState();
    const [pcClick, setPcClick] = useState(false);
    const [pcinfo, setPcInfo] = useState([]);
    const [os, setOs] = useState({ os: "" });
    const [ram, setRam] = useState({ ram: "" });
    const [processor, setProcessor] = useState({ processor: "" });
    const [memory, setMemory] = useState({ memory: "" });
    const [update, setUpdate] = useState(false);
    const [issue, setIssue] = useState(false);
    const [issues, setIssues] = useState([]);
    const [isthere, setIsThere] = useState(false);
    const [comment, setComment] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    let issuedata;
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
        console.log(result)
        setFetched(true)
        setSystems(personalComputers);
    }

    async function onPcClickHandler(system_info) {
        setPcClick(true)
        setPcInfo(system_info);
        setOs(system_info.pc_os);
        setRam(system_info.pc_ram);
        setMemory(system_info.pc_memory);
        setProcessor(system_info.pc_processor)

        // console.log(system_info.issues)


        let ref = await fetch(`<--firebase realtime database endpoint address-->sysadmin/configured/${system_info.lab_no}/pc/${system_info.pc_no}/issues/currentIssue.json`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        ref = await ref.json()
        if (ref != null) {
            setIsThere(true);
            issuedata = Object.keys(ref).map(key => {
                return ref[key];
            })
            // if(issuedata==null){
            //     setIssues([])
            // }
            setIssues(issuedata);
            console.log(issuedata)
        } else {
            setIsThere(false);
            document.getElementById("issueTab").onclick = null;
            setIssues("")
        }
    }

    async function onResolveHandler(issue) {
        let technician_name = localStorage.getItem('username');
        let technician_email = localStorage.getItem('email');
        let faculty_name = issue.reportedBy;
        let faculty_email = issue.faculty_email;
        let issueDescription = issue.issueDescription;
        let pc_no = issue.pc_no;
        let timestamp = issue.timestamp;
        let solution = comment;
        let issue_no = issue.issue_no
        let issueResolved = (pcinfo.issueResolved + 1);
        let resolvedTimestamp = new Date().toISOString().slice(0, 10);
        let month = new Date(resolvedTimestamp).getMonth();
        console.log(month);
        console.log(resolvedTimestamp);
        console.log(issueDescription, pc_no, timestamp, solution);
        let result = await fetch(`<--Server endpoint address-->system_admin/dashboard/labs/view/${issue.lab_no}`, {
            method: "post",
            body: JSON.stringify({ issueDescription, pc_no, timestamp, solution, issue_no, issueResolved, resolvedTimestamp, month, faculty_name, faculty_email, technician_name, technician_email }),
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json()
        console.log(result);
        navigate(0);
    }

    async function onRevertHandler(issue){
        let technician_name = localStorage.getItem('username');
        let technician_email = localStorage.getItem('email');
        let faculty_name = issue.reportedBy;
        let faculty_email = issue.faculty_email;
        let issueDescription = issue.issueDescription;
        let pc_no = issue.pc_no;
        let timestamp = issue.timestamp;
        let solution = comment;
        let issue_no = issue.issue_no
        console.log(technician_name,technician_email,faculty_name,faculty_email,issueDescription,pc_no,timestamp,solution,issue_no);
        let result = await fetch(`<--Server endpoint address-->system_admin/dashboard/labs/view/${issue.lab_no}`, {
            method: "put",
            body: JSON.stringify({ issueDescription, pc_no, timestamp, solution, faculty_name, faculty_email, technician_name, technician_email, issue_no }),
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json()
        console.log(result);
        navigate(0);
    }

    async function onUpdatePCStats(lab_no, pc_no) {
        let result = await fetch(`/system_admin/dashboard/labs/view/${lab_no}/${pc_no}`, {
            method: "post",
            body: JSON.stringify({ os, ram, processor, memory }),
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json()
        console.log(result);
        navigate(0);
        setUpdate(false)
    }

    function onEditHandler() {
        setUpdate(true)
    }

    const renderGrid = () => {
        document.documentElement.style.setProperty("--rows", rows);
        document.documentElement.style.setProperty("--cols", cols);

        return systems.map((system, index) =>
            <div key={index} className="grid-item flex flex-col my-auto ml-5 relative"
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
            <SystemAdminNavBar></SystemAdminNavBar>
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
                <div className="w-1/3 mx-auto text-center  font-light shadow-md shadow-slate-800 rounded-l-3xl h-fit ">
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
                            <div className="shadow-md shadow-slate-800 rounded-t-2xl rounded-b-3xl h-fit">
                                <div className="flex">
                                    <p className="px-20 mx-1 rounded-t-2xl active:bg-slate-400 " onClick={() => setIssue(false)}>PC Details</p>
                                    <p className="px-20 mx-1 rounded-t-2xl active:bg-slate-400" id="issueTab" onClick={() => setIssue(true)}>Issue's</p>
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
                                    {update && <table className="mx-5 my-5">
                                        <tbody>
                                            <tr>
                                                <th className="font-medium">Operating System</th>
                                                <td className="px-10">
                                                    <input type="text" defaultValue={pcinfo.pc_os} onChange={(e) => setOs(e.target.value)}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">RAM</th>
                                                <td className="px-10">
                                                    <input type="text" defaultValue={pcinfo.pc_ram} onChange={(e) => setRam(e.target.value)}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">Processor</th>
                                                <td className="px-10">
                                                    <input type="text" defaultValue={pcinfo.pc_processor} onChange={(e) => setProcessor(e.target.value)}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="font-medium">Memory</th>
                                                <td className="px-10">
                                                    <input type="text" defaultValue={pcinfo.pc_memory} onChange={(e) => setMemory(e.target.value)}></input>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>}
                                    {!update ? <button onClick={onEditHandler} className="mt-28 mb-2 bg-slate-800 px-4 py-1 rounded-sm text-white">Edit</button>
                                        : <button className="mt-28 mb-2 bg-slate-800 px-4 py-1 rounded-sm text-white"
                                            onClick={() => onUpdatePCStats(pcinfo.lab_no, pcinfo.pc_no)}>Update</button>}
                                </div>}
                                <div className="overflow-y-auto overflow-hidden">
                                    {isthere && issue && issues.map((item, index) =>
                                        <div className="flex justify-between border-slate-400 border rounded-3xl mx-2">
                                            <div className="flex flex-col justify-start m-4 w-2/3">
                                                <p className="text-left font-normal">Issue Raised</p>
                                                <p className="text-left">{item.issueDescription}</p>
                                                <textarea type="text" className="rounded-md" rows="3" style={{ resize: "none", outline: "none" }}
                                                    onChange={(e) => setComment(e.target.value, item.issue_no)}></textarea>
                                            </div>
                                            <div className="flex flex-col mb-6">
                                                <div>
                                                    <button className="mt-16 mx-4 py-1 px-2 rounded-md bg-slate-800 text-white"
                                                        onClick={() => onResolveHandler(item)}>Resolve Issue</button>
                                                </div>
                                                <div>
                                                    <button className="mt-5 mx-5 py-1 px-2 rounded-md bg-slate-800 text-white"
                                                        onClick={() => onRevertHandler(item)}>Revert Issue</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!isthere && <div>
                                        <p>No issues found</p>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
export default ViewEditLab;