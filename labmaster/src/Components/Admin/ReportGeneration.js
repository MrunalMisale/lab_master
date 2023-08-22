import AdminNavBar from "./AdminNavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportGeneration() {
    const [month, setMonth] = useState("");
    const [display, setDisplay] = useState(false);
    const [reportData, setReportData] = useState([]);
    const navigate = useNavigate()

    function onPrintDocument() {
        let page = document.getElementById("report").innerHTML;
        let windowpage = document.body.innerHTML;
        document.body.innerHTML = page;
        window.print();
        document.body.innerHTML = windowpage;
        navigate(0);
    }

    async function getReportData() {
        let result = await fetch(`<--firebase realtime database endpoint address-->report/2023/${month}.json`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json();
        // console.log(typeof(result));
        if (result == null || result == undefined) {
            setDisplay(false);
        } else {
            setDisplay(true);
            let data = Object.keys(result).map(key => {
                return result[key];
            })
            setReportData(data);
            console.log(data)
        }

    }

    function getMonthS(value) {
        let noOfMonth = new Date(value).getMonth()
        setMonth(noOfMonth);
    }

    return (
        <div className="bg-slate-200 h-screen">
            <AdminNavBar></AdminNavBar>
            <div className="flex justify-center p-10 shadow-md shadow-slate-600 rounded-xl m-10">
                <input type="month" onChange={(e) => getMonthS(e.target.value)}></input>
                <button onClick={getReportData} className="bg-green-900 p-2 text-white mx-5 rounded-md w-28">Get Report</button>

            </div>
            {display && <div id="report" className=" p-10 shadow-md shadow-slate-600 rounded-xl m-10 w-11/12 mx-auto h-96 overflow-y-auto relative">
                {display && <button onClick={onPrintDocument} className="bg-slate-600 p-2 mx-5 rounded-md w-28 absolute top-4 right-4 text-white">Print</button>}
                <h2 className="tracking-widest font-medium text-4xl text-center">LAB REPORT</h2>
                <p className="tracking-widest font-medium text-center text-xl -mt-1">Your Institute Name</p>
                <p className="border-black border-t border-b text-center font-light mt-10 mb-5 text-xl">REPORT</p>
                <div className="w-full">
                    <table className="mx-auto border border-black border-collapse p-4">
                        <tbody>
                            <tr className="tracking-widest font-medium text-center border border-black">
                                <th className=" border border-black p-5">Lab No.</th>
                                <th className=" border border-black p-5">PC No.</th>
                                <th className=" border border-black p-5">Issue / Reported On</th>
                                <th className=" border border-black p-5">Solution / Resolved On</th>
                            </tr>
                            {reportData.map((issue, index) =>
                                <tr className="border border-black">
                                    <td className=" border border-black text-center">{issue.lab_no}</td>
                                    <td className=" border border-black text-center">{issue.pc_no}</td>
                                    <td className=" border border-black">
                                        <p>Issue : {issue.issueDescription}</p>
                                        <p>Reported on : {issue.timestamp}</p>
                                    </td>
                                    <td className=" border border-black">
                                        <p>Solution : {issue.solution}</p>
                                        <p>Resolved on : {issue.resolvedTimestamp}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>}
        </div>
    )
}
export default ReportGeneration;