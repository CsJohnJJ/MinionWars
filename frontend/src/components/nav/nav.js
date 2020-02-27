import React from "react";
import { withRouter } from "react-router-dom";
import "./nav.css";
import Logo from '../../../src/app/assets/logo.png'
import Coin from '../../../src/app/assets/coin.png'


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
         <div className="navItems">
        <div className="logout" onClick={this.logoutUser}>
          <a>Logout</a>
        </div>
        <div className="coins">
           <img className='coin' src={Coin} /> 
           <p className="money">1000</p>
        </div>
       </div >
      );
    } else {
      return (
       
        <div className="login" onClick={this.props.loginForm}>
          <a>Login</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='background'>
       <header>
            <div className="logo">
                <img className='logo' src={Logo}/>
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Minions</a></li>
                <li>{this.getLinks()}</li>
                <li>
          
                    <a href="#">
                        <i className="fa fab fa-github"></i>
                    </a>
                </li>
            </ul>
        </header>
        </div>
    );
  }
}

export default withRouter(Nav);
