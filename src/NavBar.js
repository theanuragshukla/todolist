import React, {
    Component
} from 'react'
import './NavBar.css'
import Ham from './HamBurger'
import HideSideBar from './HamBurger'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super()
        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true,
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    // Adds an event listener when the component is mount.
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    // Remove the event listener when the component is unmount.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    // Hide or show the menu.
    handleScroll () {
        const prevScroll = this.state.prevScrollpos;
        const currPos = window.pageYOffset;
        const visibl = prevScroll > currPos;
        this.setState({
            prevScrollpos: currPos,
            visible: visibl
        })
    }

    render() {
        const style = {
            background:this.state.prevScrollpos==0 ? "#222831" : "#393E46",
        }
        return(
            <div id="nav" style={style} className={this.state.visible ? "navBar": "navBar navbar-hidden"}>
        <Ham visible={this.state.visible} />
	<h2>	<Link to='/dashboard'>
			ToDo-List
		</Link></h2>
            </div>
        )
    }
}

export default NavBar
