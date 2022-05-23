import React,{useState,useEffect} from 'react'
import './Main.css'
import Item from './Item'
import CtrlBar from './CtrlBar'

const Main = (props) => {
	const emptyTodo = {
		id:1,
		done:false,
		title:"hello world Amet necessitatibus assumenda quod quo animi. ",
		desc:"Sit iure officia dignissimos quos porro? Voluptatibus quisquam magni voluptatum alias iusto. Aperiam maiores numquam illo et dicta Velit beatae voluptas laborum cupiditate rerum.",
		time:"time",
		date:"date",
		starttime:"time",
		startdate:"date"
	}
	const [todos,setTodos] = useState([])
	const [count,setCount] = useState(1)
	

function getDate() {
    var now = new Date();
    return ((now.getFullYear()) + '-' + (now.getMonth()+1) + '-' + now.getDate())
}
function getTime() {
    var now = new Date();
    return (now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())))
}
const fetchTodos=async ()=>{
		await fetch('https://dontknowthename.herokuapp.com/gettodos', {
			method: 'GET',
			crossdomain: true,
			withCredentials:'include'
		})
			.then(res => res.json())
			.then(res =>setTodos(res.status?res.result:[]))
		
	
}

useEffect(()=>{
		fetchTodos()
},[])

const getDateTime=()=> {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'-'+month+'-'+day+'|'+hour+':'+minute;   
         return dateTime;
    }
const updatetodostatus=(id)=>{
	alert(id)
	fetch('https://dontknowthename.herokuapp.com/updatetodostatus', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		body: JSON.stringify({"id":id})
		})
			.then(res=>res.json())
			.then(res=>console.log(res))

}
const deleteme=async (id)=>{
	fetch('https://dontknowthename.herokuapp.com/deletetodo', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		body: JSON.stringify({"id":id})
		})
			.then(res=>res.json())
			.then(res=>console.log(res))
	fetchTodos()
}
	const addNew =async (newObj) => {
		setCount(async prev=>{
			return(prev+1)
		})
		newObj.id=count
		newObj.startdate=getDate()
		newObj.starttime=getTime()
		setTodos(prev=>{
			return (
				[...prev,newObj]
			)
		})
		fetch('https://dontknowthename.herokuapp.com/addnewtodo', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newObj)
		})
			.then(res=>res.json())
			.then(res=>console.log(res))
	}
	return (
		<>
		<CtrlBar submit={addNew}/>
		<div className='main'>
		{
			todos.map(todo => {

				return(<Item obj={todo} update ={updatetodostatus} deleteme={deleteme}  key = {todo.title+todo.id} />)
			})
		}

		</div></>
	)
}


export default Main
