import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Col, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';
import API from '../../API';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            successful: false
        }
    }

    render() {
        return (
            <section className="fm-outside-content">
                <header>
                    <h1>FileManager 2</h1>
                    <h2>Kontakt aufnehmen</h2>
                </header>
                <Form>
                    {
                        this.state.successful ?
                            this.renderSuccess() :
                            this.renderDefault()
                    }
                    <FormGroup>
                        <FormText><Link to="/"><FormattedMessage id="login.back_to_signin"/></Link></FormText>
                    </FormGroup>
                </Form>
            </section>
        );
    }

    renderSuccess() {
        return(
            <div>
                <p>Ihre Nachricht wurde erfolgreich per Mail versendet - Sie haben erhalten möglichst schnell eine Antwort per Mail.</p>
            </div>
        );
    }

    renderDefault() {
        return(
            <div>
                <FormGroup row>
                    <Label for="email" sm={3}><FormattedMessage id="login.email"/></Label>
                    <Col sm={9}>
                        <Input id="email" name="email" placeholder="name@example.com" onChange={this.handleChange("email")}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="message" sm={3}>Nachricht</Label>
                    <Col sm={9}>
                        <Input type="textarea" id="message" name="message" placeholder="Ihre Nachricht" onChange={this.handleChange("message")}/>
                    </Col>
                </FormGroup>
                <Button color="warning" className="fm-outside-content-submit" onClick={this.handleSendMessage}>Nachricht senden</Button>
            </div>
        );
    }

    handleSendMessage = () => {
        this.sendMessage();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    async sendMessage() {
        let {status, json} = await API.contact(this.state.email, this.state.message);
        if(status == 200 && json.status == "ContactSuccess") {
            this.setState({
                successful: true
            });
        } else {

        }
    }
}

export default Contact;