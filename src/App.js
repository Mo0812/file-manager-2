import React, { Component } from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LazyLoad from "react-lazy-load";

import API from './API';

import Login from './components/login/Login';
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import Menu from './components/menu/Menu';
import FileList from './components/filelist/FileList';
import UserList from "./components/userlist/UserList";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import img from "./assets/bg.jpg";

class App extends Component {
    constructor(props) {
        super(props);

        let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
        this.state = {
            isLoggedIn: isLoggedIn
        }
    }

    render() {
        if(this.state.isLoggedIn) {
            return this.renderLoggedIn();
        } else {
            return this.renderLoggedOut();
        }
    }

    renderLoggedIn() {
        return (
            <main className="main">
                <Menu onClick={this.handleLogoutButton} />
                <Container fluid>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={FileList} />
                            <Route path="/filelist" component={FileList} />
                            <Route path="/userlist" component={UserList} />
                        </Switch>
                    </BrowserRouter>
                </Container>
            </main>
        );
    }

    renderLoggedOut() {
        return(
            <Container className="fm-outside-container" fluid>
                <LazyLoad>
                    <img src={img} className="fm-bg-img"/>
                </LazyLoad>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={() => <Login onClick={this.handleLoginButton}/>} />
                        <Route path="/forgotpassword" component={ForgotPassword} />
                    </Switch>
                </BrowserRouter>
            </Container>
        );
    }

    async handleAuth() {
        let {status, json} = await API.auth();
        if(status === 200) {
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                isLoggedIn: true
            });
        } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
    }

    handleLogut() {
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        this.setState({
            isLoggedIn: false
        });
    }

    handleLoginButton = () => {
        this.handleAuth();
    }

    handleLogoutButton = () => {
        this.handleLogut();
    }

}

export default App;
