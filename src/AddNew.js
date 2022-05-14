import React from "react"

const AddNew=(props)=>{

	return(
		<div onClick={()=>{props.add(props.demo)}}>AddNew</div>
	)
}
export default AddNew
