import React, {useState} from 'react'
import './Item.css'
const Item = ({obj,deleteme,update}) => {
	const [state,setState]=useState(obj)
	const [desc,setDesc]=useState(false)
	const toggleDone=()=>{
		setState(oldState=>{
		return ({...oldState,
			done:!oldState.done
		})
		})

		update(state.id)
	}
	return (<>
		<div className="item">

		<div className="layer2">
	<div className="date created">
	<span>{state.startdate} | {state.starttime}</span> | 
	deadline: <span>{state.enddate} | {state.endtime}</span>
		</div>
	<div className="date deadline">
		<span onClick={()=>deleteme(state.id)}>delete</span>
		</div>
		</div>



		<div className="layer1">
		<div className="chkbx">
		<input onChange={toggleDone} type="checkbox" checked={state.done}/>
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
