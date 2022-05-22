import React,{useEffect,useState} from "react";
import './Dash.css'
import  { useNavigate} from 'react-router-dom'
const Dash = ()=>{
	const [data,setData]=useState()	
	const navigate = useNavigate()
	const verify =async ()=>{
		await fetch('/checkAuth', {
			method: 'GET',
			crossdomain: true,
			withCredentials:'include'
		})
		.then(res => res.json())
			.then(res =>manageAuth(res))
	}

	const manageAuth=(val)=>{
		setData(val)
			if(!val.result){
					alert("you must login first")
					return navigate('/login')
				}else{
					alert("you are logged in")
				}
	}
	
	useEffect( ()=>{
		verify()
	},[])

	return (
		<div className="dash">
		<div className="greet"><h2>{`Hello, ${data.data.fname}`}</h2></div>
		</div>
	)
}
export default Dash
