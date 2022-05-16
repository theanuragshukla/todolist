import React,{useState} from 'react'
import './Main.css'
import Item from './Item'
import CtrlBar from './CtrlBar'

const Main = (props) => {
	const emptyTodo = {
		id:1,
		done:false,
		title:"hello world Amet necessitatibus assumenda quod quo animi. ",
		desc:"Sit iure officia dignissimos quos porro? Voluptatibus quisquam magni voluptatum alias iusto. Aperiam maiores numquam illo et dicta Velit beatae voluptas laborum cupiditate rerum.",
		time:"today",
		deadline:"tomorrow"

	}
	const [todos,setTodos] = useState([emptyTodo])
	const [count,setCount] = useState(1)
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

	const addNew =async (newObj) => {
		setCount(async prev=>{
			return(prev+1)
		})
		newObj.id=count
		newObj.deadline=newObj.date+'|'+newObj.time
		newObj.time=getDateTime()
		setTodos(prev=>{
			return (
				[...prev,newObj]
			)
		})
	}
	return (
		<>
		<CtrlBar submit={addNew}/>
		<div className='main'>
		{
			todos.map(todo => {
				return(<Item obj={todo} key = {todo.title+todo.id} />)
			})
		}

		</div></>
	)
}


export default Main
