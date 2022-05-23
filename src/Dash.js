import React,{useEffect,useState} from "react";
import './Dash.css'
import  { useNavigate} from 'react-router-dom'
const Dash = ()=>{
	const [data,setData]=useState({
		result:false,
		data:{
			
		}
	})	
	const navigate = useNavigate()
	const verify =async ()=>{
		await fetch('https://dontknowthename.herokuapp.com/checkAuth', {
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
			return navigate('/login')
		}else{
		}
	}

	useEffect( ()=>{
		verify()
	},[])

	return (
		<div className="dash">
		<div className="greet"><h2>Hello,{data.result ? data.data.fname:"user"} </h2></div>
		</div>
	)
}
export default Dash
