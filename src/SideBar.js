import React from 'react'
import {Link} from 'react-router-dom'
import './SideBar.css'
class SideBar extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div className="sideBar">
            <div className={this.props.visible ? 'wrapperNav visible': 'wrapperNav hidden'}>
			<h1>
			<Link to='login'>
			Login
			</Link>
			</h1>
			<h1>
			<Link to='signup'>
			Signup
			</Link>
			</h1>
        
            </div>
            </div>
        )
    }

}
export default SideBar
