import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
function LoginComponent() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLoginHandler = async (event) =>{
        event.preventDefault()
        let result = await fetch("<--Server endpoint address-->login",{
            method:"post",
            body: JSON.stringify({username,password}),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        result = await result.json();
        console.log(result);        //Displaying error is remaining
        localStorage.setItem("username", result.username);
        localStorage.setItem("email",result.email);
        localStorage.setItem("role",result.role);
        if(result.role==="Admin"){
            navigate('/admin/dashboard');
        }else if(result.role==="Incharge"){
            navigate('/incharge/dashboard')
        }else if(result.role==="Tech"){
            navigate('/system_admin/dashboard');
        }
    }

    return (
        <div className="flex flex-col w-3/4 mx-auto my-28 border border-slate-300 rounded p-4 shadow-md shadow-slate-300
        lg:w-1/4 lg:shadow-md lg:shadow-slate-400">
            <h1 className="text-center font-light text-2xl text-gray-900">Login</h1>
            <form className="flex flex-col">
                <label htmlFor="text" className="my-2 font-extralight text-gray-900">Username</label>
                <input type="text" name="text" onChange={(event)=>setUsername(event.target.value)} placeholder="Enter Username" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none"></input>
                <label htmlFor="password" className="my-2 font-extralight text-gray-900">Password</label>
                <input type="password" name="password" onChange={(event)=>setPassword(event.target.value)} placeholder="Enter Password" className="placeholder:font-extralight placeholder:text-sm placeholder:pl-1 rounded py-2 px-2 outline-none"></input>
                <button onClick={onLoginHandler} className="mt-10 mb-2 font-light bg-gray-900 text-slate-200 py-2 rounded">Log In</button>
            </form>
        </div>
    );
}
export default LoginComponent;