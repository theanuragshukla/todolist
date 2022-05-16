import './App.css';
import NavBar from './NavBar'
import Main from './Main'
import Dash from './Dash'
import CtrlBar from './CtrlBar'

function App() {
  return (
    <div className="app">
	  <NavBar/>
	  <Dash/>
	  <Main>
	  <CtrlBar/>
	  </Main>

   </div>
  );
}

export default App;
