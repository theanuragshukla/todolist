import React,{useState} from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
const Login =()=>{
	const navigate=useNavigate()
	const [data,setData]=useState({
		user:"",
		pas:""
	})

	const handleChange=(e)=>{
		const x = e.target.name
		const y = e.target.value
		setData(prev=>{
			prev[x]=y
			return prev 
		})

	}
	
const submit = ()=>{
		const user = data.user
		const pass =data.pass
		fetch('/let-me-in', {
			method: 'POST',
			crossdomain: true,
			withCredentials:'include',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( {
				pass:pass,
				"user":user
			})
		})
			.then(res=>res.json())
			.then(res=>res.status ? navigate('/dashboard'):alert("wrong credentials") )

	}
	return (
		<div className="login">
		<div className="loginMain">
		<div className="heading">
		<h1>Login</h1>
		</div>
		<div className="inpField">
		<input type="text" name="user" onChange={handleChange}  placeholder="Username"/>
		</div>
		<div className="inpField">
		<input type="password" name="pass" onChange={handleChange}  placeholder="Password"/>
		</div>
		<div className="inpField">
		<button onClick={submit}>Submit</button>
		</div>

		</div>
		</div>
	)
}

export default Login

