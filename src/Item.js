import React, {useState} from 'react'
import './Item.css'
const Item = ({obj}) => {
	const [state,setState]=useState(obj)
	const [desc,setDesc]=useState(false)
	const toggleDone=()=>{
		setState(oldState=>{
		return ({...oldState,
			done:!oldState.done
		})})
	}
	return (<>
		<div className="item">

		<div className="layer2">
	<div className="date created">
	<span>{state.time}</span> | 
	deadline: <span>{state.deadline}</span>
		</div>
	<div className="date deadline">
		</div>
		</div>



		<div className="layer1">
		<div className="chkbx">
		<input onChange={toggleDone} type="checkbox"/>
		</div>
		<div className="heading" onClick={()=>setDesc(prev=>{return !prev})}>
		<h2 className={state.done ? "strike":""}>{state.title}</h2>
		</div>
		</div>

			<div className={desc ? "desc" : "desc hideDesc"}>
		{state.desc}
		</div>

		</div>
		</>
	)
}

export default Item
