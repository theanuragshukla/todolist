import React,{useState} from "react"
import './AddNew.css'
const AddNew=({submit})=>{
	const [state,setState]=useState({
	done:false,
		
	})
	const handleChange = (e) =>{
		const x = e.target.name
		const y = e.target.value
		setState(prev=>{
			prev[x]=y
			return prev 
	})
	}
	const submitForm=()=>{
		submit(state)
		alert(JSON.stringify(state))
	}
	return(
		<div className="inpMain">
		<input className="inp titleInp" value={state.title}  onChange={handleChange}  placeholder="Enter the Title" name="title" type="text"/>
		<input  className="inp descInp" value={state.desc} onChange={handleChange} placeholder="Enter description(optional)" name="desc" type="text"/>
<div className="deadlineInpDiv">
		<input className="inp deadlineInp" value={state.endtime} onChange={handleChange} placeholder="time" name="endtime" type="time"/>
		<input className="inp deadlineInp" value={state.enddate} onChange={handleChange} placeholder="date" name="enddate" type="date"/>
		</div>
		<button onClick={submitForm} className="submitBtn">Add Task</button>
		</div>
	)

}
export default AddNew
