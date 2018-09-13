import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, Jumbotron, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import sha1 from 'sha1';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <section className="fm-outside-content">
                <header>
                    <h1>FileManager 2</h1>
                </header>
                <Form>
                    <FormGroup row>
                        <Label for="username" sm={3}><FormattedMessage id="login.username"/></Label>
                        <Col sm={9}>
                            <Input id="username" name="username" placeholder="Username" onChange={this.handleChange("username")}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={3}><FormattedMessage id="login.password"/></Label>
                        <Col sm={9}>
                            <Input type="password" placeholder="Password" onChange={this.handleChange("password")}/>
                        </Col>
                    </FormGroup>
                    <Button color="success" className="fm-outside-content-submit" onClick={this.handleLogin}><FormattedMessage id="login.submit"/></Button>
                    <FormGroup>
                        <FormText><Link to="/forgotpassword"><FormattedMessage id="login.forgotpassword"/></Link></FormText>
                        <FormText><Link to="/"><FormattedMessage id="login.contact"/></Link></FormText>
                    </FormGroup>
                </Form>
            </section>
        );
    }

    handleLogin = () => {
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("password", sha1(this.state.password));
        this.props.onClick();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
}

export default Login;