import React, {
    Component
} from 'react'
import './NavBar.css'
import Ham from './HamBurger'
import HideSideBar from './HamBurger'

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
            background:this.state.prevScrollpos==0 ? "blue" : "red",
        }
        return(
            <div id="nav" style={style} className={this.state.visible ? "navBar": "navBar navbar-hidden"}>
        <Ham visible={this.state.visible} />
            </div>
        )
    }
}

export default NavBar
