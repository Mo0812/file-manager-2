import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Col, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';
import sha1 from 'sha1';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
                        <Label for="username" sm={3}><FormattedMessage id="login.email"/></Label>
                        <Col sm={9}>
                            <Input id="email" name="email" placeholder="name@example.com" onChange={this.handleChange("email")}/>
                        </Col>
                    </FormGroup>
                    <Button color="warning" className="fm-outside-content-submit" onClick={this.handleForgotPassword}><FormattedMessage id="login.reset"/></Button>
                    <FormGroup>
                        <FormText><Link to="/"><FormattedMessage id="login.back_to_signin"/></Link></FormText>
                        <FormText><Link to="/contact"><FormattedMessage id="login.contact"/></Link></FormText>
                    </FormGroup>
                </Form>
            </section>
        );
    }

    handleForgotPassword = () => {

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
}

export default ForgotPassword;