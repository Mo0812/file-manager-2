import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <section className="fm-login">
                    <header>
                        <h1>FileManager 2</h1>
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
                        <Button color="success" className="fm-login-submit" onClick={this.handleLogin}>Anmelden</Button>
                        <FormGroup>
                            <FormText><Link to="/">Password vergessen?</Link></FormText>
                            <FormText><Link to="/">Kontakt aufnehmen</Link></FormText>
                        </FormGroup>
                    </Form>
                </section>
        );
    }
}

export default ForgotPassword;