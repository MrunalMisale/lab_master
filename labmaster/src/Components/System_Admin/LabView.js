import React, { useEffect, useState } from "react";
import SystemAdminNavBar from "./SystemAdminNavBar";
import { useParams } from "react-router-dom";
import PC from '../../Assests/PC.png'
function LabView() {

    const [fetched, setFetched] = useState(false);
    const [rows, setRows] = useState(Number);
    const [cols, setCols] = useState(Number);
    const [systems, setSystems] = useState([]);
    const params = useParams();
    const [labinfo, setLabInfo] = useState();

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

    const renderGrid = () => {
        document.documentElement.style.setProperty("--rows", rows);
        document.documentElement.style.setProperty("--cols", cols);

        return systems.map((system, index) =>
            <div key={index} className="grid-item flex flex-col my-auto ml-5 "
                style={{ padding: "0px", textAlign: "center", fontSize: "10px" }}>
                <img src={PC} className="w-16 mx-auto" alt="PC Img"></img>
                <p>{system.pc_no}</p>
            </div>
        )
    };

    return (
        <div className="bg-slate-200 h-screen">
            <SystemAdminNavBar></SystemAdminNavBar>
            <div className="flex w-screen">
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
                {fetched && <div className="w-1/3 mx-auto text-center font-light m-56">
                    <p>{labinfo.lab_no}</p>
                    <p>{labinfo.lab_name}</p>
                    <p>Lab Configuration Done!.</p>
                </div>}
            </div>
        </div>

    )
}
export default LabView;