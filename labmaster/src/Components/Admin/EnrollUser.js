import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

function EnrollUser() {
    const navigate = useNavigate();
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [role, setRole]= useState("");

    async function onEnrollHandler(event){
        event.preventDefault();
        let result = await fetch("<--Server endpoint address-->admin/dashboard/enroll-user",{
            method: "post",
            body: JSON.stringify({username,email,password,role}),
            headers:{ "Content-Type":"application/json"}
        })
        result= await result.json();
        if(result.status===true){
            navigate('/admin/dashboard')
        }
    }

    return (
        <div className="bg-slate-200 h-screen">
            <AdminNavBar></AdminNavBar>
            <div className="flex flex-col w-3/4 mx-auto my-16 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
                lg:w-1/4 lg:shadow-md lg:shadow-slate-400">
                <h1 className="text-center font-light text-2xl text-gray-900">Enroll User</h1>
                <form className="flex flex-col">
                    <label htmlFor="text" className="my-2 font-extralight text-gray-900">Username</label>
                    <input type="text" name="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                    <label htmlFor="email" className="my-2 font-extralight text-gray-900">Email</label>
                    <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                    <label htmlFor="password" className="my-2 font-extralight text-gray-900">Password</label>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required></input>
                    <label htmlFor="role" className="my-2 font-extralight text-gray-900">Role</label>
                    <select onChange={(e) => setRole(e.target.value)} className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none" required>
                        <option value="Choose any one" selected disabled>Choose any one</option>
                        <option value="Tech">Tech</option>
                        <option value="Incharge">Incharge</option>
                    </select>
                    <button onClick={onEnrollHandler} className="mt-10 mb-2 font-light bg-gray-900 text-slate-200 py-2 rounded">Enroll</button>
                </form>
            </div>
        </div>
    )
}
export default EnrollUser;