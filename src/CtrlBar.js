import React,{useState} from "react";
import './CtrlBar.css'
import AddNew from './AddNew'
const CtrlBar = ({submit}) => {
	const [state,setState]=useState(true)
	return (
		<>
		<div className="ctrl" >
		<div className="addnewbtn" onClick={()=>{
			setState(prev => {
				return !prev
			})
		}}>{state?"×":"+"}</div>
		</div>
		<div className="tools">
		{
			state ? <AddNew submit={submit}/> : ""
		}
		</div>
		</>
	)
}
export default CtrlBar
