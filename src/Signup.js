import React,{useState} from "react";
import './Signup.css'
import checkAll from './utils'
const Signup =()=>{
	const [data,setData]=useState({
		user:"",
		pass:"",
		email:"",
		fname:"",
		lname:""
	})

	const submit=async ()=>{
if(await checkAll(data)){
		fetch('https://dontknowthename.herokuapp.com/add-new-user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res=>res.json())
			.then(res=>console.log(res))
		alert("account created")
	}
	else {
		alert("error")
	}

	
	
	}


	const handleChange=(e)=>{
		const x = e.target.name
		const y = e.target.value
		setData(prev=>{
			prev[x]=y
			return prev 
		})

	}
	
	return (
		<div className="login">
			<div className="loginMain">
				<div class="heading">
				<h1>Signup</h1>
		</div>
				<div className="inpField">
					<input type="text" name="user" onChange={handleChange} placeholder="Username"/>
				</div>
					<div className="inpField">
					<input type="text" name="email" onChange={handleChange} placeholder="Email"/>
				</div>
		<div className="inpField">
					<input type="text" name="fname" onChange={handleChange} placeholder="fname"/>
				</div>
		<div className="inpField">
					<input type="text" name="lname" onChange={handleChange} placeholder="lname"/>
				</div>
		<div className="inpField">
					<input type="password"  name="pass" onChange={handleChange}  placeholder="Password"/>
				</div>
				<div className="inpField">
		<button onClick={submit} >Submit</button>
				</div>
		
			</div>
		</div>
	)
}

export default Signup

