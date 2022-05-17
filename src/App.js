import './App.css';
import NavBar from './NavBar'
import Main from './Main'
import Dash from './Dash'
import CtrlBar from './CtrlBar'
import {Route, Routes} from 'react-router-dom';
import Login from './Login'

function App() {
  return (
    <div className="app">
	  <NavBar/>
	  <Routes>
	  <Route path='/' element={
		  <>
	  <Dash/>
	  <Main>
	  <CtrlBar/>
	  </Main></>} />
	  <Route path='login' element={Login} />
  </Routes>
   </div>
  );
}

export default App;
