import React,{useState} from 'react'
import './Main.css'
import Item from './Item'
import AddNew from './AddNew'

const Main = () => {
	const emptyTodo = {
		id:0,
		done:false,
		title:"hello world",
		desc:"Sit iure officia dignissimos quos porro? Voluptatibus quisquam magni voluptatum alias iusto. Aperiam maiores numquam illo et dicta Velit beatae voluptas laborum cupiditate rerum.",
		time:"today",
		deadline:"tomorrow"

	}
	const [todos,setTodos] = useState([emptyTodo])
	const [count,setCount] = useState(0)
	const addNew = (newObj) => {
		setCount(prev=>{
			return(prev+1)
		})
		newObj.id=count
		setTodos(prev=>{
			return (
				[...prev,newObj]
			)
		})
	}
return (
		<div className='main'>
		{
			todos.map(todo => {
				return(<Item obj={todo} key = {todo.id} />)
			})
		}

		<AddNew add={addNew} demo={emptyTodo}/>
		</div>
	)
}

export default Main
