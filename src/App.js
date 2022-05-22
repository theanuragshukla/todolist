import './App.css';
import NavBar from './NavBar'
import Main from './Main'
import Dash from './Dash'
import CtrlBar from './CtrlBar'
import {Route, Routes,Navigate} from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'

function App() {
	return (
		<div className="app">
		<NavBar/>
		<Routes>
		<Route path='/' element={<Navigate to='/dashboard'/>}/>	
		<Route path='/dashboard' element={
			<>
			<Dash/>
			<Main>
			<CtrlBar/>
			</Main></>} />
		<Route path='/login' element={<Login/>} />
		<Route path='/signup' element={<Signup/>} />
		</Routes>
		</div>
  );
}

export default App;
