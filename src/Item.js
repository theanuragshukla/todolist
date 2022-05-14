import React, {useState,useEffect} from 'react'
import './Item.css'
const Item = ({obj}) => {
	const [state,setState]=useState(obj)
	const toggleDone=()=>{
		setState(oldState=>{
		return ({...oldState,
			done:!oldState.done
		})})
	}
	return (<>
		<div className="item">

		<div className="layer1">
		<div className="chkbx">
		<input onChange={toggleDone} type="checkbox"/>
		</div>
		<div className="heading">
		<h2 className={state.done ? "strike":""}>{state.title}</h2>
		</div>
		</div>

		<div className="layer2">
	<div className="date created">
	created: <span>{state.time}</span>
		</div>
	<div className="date deadline">
	deadline: <span>{state.deadline}</span>
		</div>
		</div>

		<div className="desc">
		{state.desc}
		</div>

		</div>
		</>
	)
}

export default Item