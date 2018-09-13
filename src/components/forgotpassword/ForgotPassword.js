import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedText} from 'react-intl';
import {Col, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';
import sha1 from 'sha1';

class ForgotPassword extends Component {
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
                    <h2>Passwort vergessen</h2>
                </header>
                <Form>
                    <FormGroup row>
                        <Label for="username" sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input id="username" name="username" placeholder="Username" onChange={this.handleChange("username")}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" placeholder="Password" onChange={this.handleChange("password")}/>
                        </Col>
                    </FormGroup>
                    <Button color="success" className="fm-outside-content-submit" onClick={this.handleLogin}>Anmelden</Button>
                    <FormGroup>
                        <FormText><Link to="/forgotpassword"><FormattedText id="login.back_to_signin"/></Link></FormText>
                        <FormText><Link to="/">Kontakt aufnehmen</Link></FormText>
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

export default ForgotPassword;