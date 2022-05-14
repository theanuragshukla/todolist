import React,{useState} from "react"

const AddNew=(props)=>{
	const [state,setState]=useState({

	})
	const handleChange = (e) =>{
		const x = e.target.name
		const y = e.target.value
		setState(prev=>{
			prev.x=y
			return prev 
	})


	return(
		<div onClick={()=>{props.add(props.demo)}}>AddNew</div>
		
	)
}
export default AddNew
