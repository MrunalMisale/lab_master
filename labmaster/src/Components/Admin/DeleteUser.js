import React, { useState, useEffect } from 'react'
import AdminNavBar from './AdminNavBar';
import Delete from '../../Assests/Delete.png'
import { useNavigate } from 'react-router-dom';

function DeleteUser() {
    const [users, setUsers] = useState([]);
    const navigate= useNavigate();
    let myData;

    useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        let res = await fetch("<--firebase realtime database endpoint address-->users.json", {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        res = await res.json();
        myData = res;
        myData = Object.keys(res).map(key => {
            return res[key];
        })
        setUsers(myData)
    }

    async function onDeleteUserHandler(username){
        let result = await fetch(`<--Server endpoint address-->admin/dashboard/delete-user?username=${username}`,{
            method:"delete",
            // headers:{"Content-Type":"application/json"}
        })
        result = await result.json();
        console.log(result)
        navigate(0)
    }

    return (
        <div className="bg-slate-200 h-screen">
            <AdminNavBar></AdminNavBar>
            <div className="flex flex-col w-3/4 mx-auto my-16 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
                lg:w-1/4 lg:shadow-md lg:shadow-slate-400">
                <h1 className="text-center font-light text-2xl text-gray-900">Delete User</h1>
                <table className='my-1 text-gray-900 font-light'>
                    {users.map((x, id) =>
                        <tbody key={id}>
                            <tr key={id} className="flex justify-between ml-1 my-1 border border-slate-300 shadow-md shadow-slate-300">
                                <td key={id}>
                                    <ul key={id} className="ml-2">
                                        <li className='font-normal'>{x.username}</li>
                                        <li>Role: {x.role}</li>
                                    </ul>
                                </td>
                                <td>
                                    {(x.username!="Admin")?<img src={Delete} alt="logo" 
                                    className="w-12 cursor-pointer"
                                    onClick={()=>onDeleteUserHandler(x.username)}></img>
                                    :<p className='mt-2.5 mr-3'>N/A</p>}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}
//For Future References
// const Row = (props) => {
//     const { username, role } = props;
//     return (
//         <tr>
//             <td>{username}</td>
//             <td>Role: {role}</td>
//         </tr>
//     )
// }

// const Table = (props) => {
//     const { data } = props
//     return (
//         <table>
//             {data.map(row =>
//                 <Row username={row.username} role={row.username}></Row>
//             )}
//         </table>
//     )
// }
export default DeleteUser;