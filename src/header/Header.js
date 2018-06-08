import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './Header.css';
import FoodList from './../foodList/FoodList'
export default class Header extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
                    <a className="navbar-brand"><Link to = {'/login'}>SmartQ</Link></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link"><Link to ='/home'>Home <span className="sr-only">(current)</span></Link></a>
                            </li>

                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link"><Link to = {'/login'}>LOGIN</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">REGISTER</a>
                            </li>

                        </ul>
                    </div>
                </nav>
                {/*<div className="container">*/}
                    {/*{this.props.children}*/}
                {/*</div>*/}
                <FoodList/>
            </div>
        )
    }

}