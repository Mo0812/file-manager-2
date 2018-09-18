import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Col, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';
import API from '../../API';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            successful: false
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
                {
                    this.state.successful ?
                        this.renderSuccess() :
                        this.renderDefault()
                }
                    <FormGroup>
                        <FormText><Link to="/"><FormattedMessage id="login.back_to_signin"/></Link></FormText>
                        <FormText><Link to="/contact"><FormattedMessage id="login.contact"/></Link></FormText>
                    </FormGroup>
                </Form>
            </section>
        );
    }

    renderSuccess() {
        return(
            <div>
                <p>Das Passwort wurde erfolgreich zurückgesetzt - Sie haben eine Email mit Ihren neuen Anmeldedaten erhalten</p>
            </div>
        );
    }

    renderDefault() {
        return(
            <div>
            <FormGroup row>
                <Label for="username" sm={3}><FormattedMessage id="login.email"/></Label>
                <Col sm={9}>
                    <Input id="email" name="email" placeholder="name@example.com" onChange={this.handleChange("email")}/>
                </Col>
            </FormGroup>
            <Button color="warning" className="fm-outside-content-submit" onClick={this.handleForgotPassword}><FormattedMessage id="login.reset"/></Button>
            </div>
        );
    }

    handleForgotPassword = () => {
        this.forgotPassword();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    async forgotPassword() {
        let {status, json} = await API.forgotPasswort(this.state.email);
        if(status == 200 && json.status == "AuthSuccess") {
            this.setState({
                successful: true
            });
        } else {

        }
    }
}

export default ForgotPassword;