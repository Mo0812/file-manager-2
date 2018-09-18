import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import API from "../../API";

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invalidForm: false,
            passwordChanged: false,
            passwordFirst: "",
            passwordSecond: ""
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.open} toggle={this.close} className={this.props.className}>
                <ModalHeader toggle={this.close}><FormattedMessage id="changepassword.title"/></ModalHeader>
                <ModalBody>
                    {
                        this.state.passwordChanged ?
                            this.renderSuccess() :
                            this.renderDefault()
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handlePasswordChange} disabled={this.state.passwordChanged}><FormattedMessage id="changepassword.change"/></Button>
                    <Button color="secondary" onClick={this.close}><FormattedMessage id="changepassword.cancel"/></Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderDefault() {
        return(
            <div>
                <p>Um Ihr Passwort zu ändern, geben Sie bitte Ihr neues Password in die beiden unten stehenden Felder ein:</p>
                <hr />
                <Form>
                    <FormGroup>
                        <Label>Neues Passwort</Label>
                        <Input placeholder="mind. 8 Zeichen" type="password" onChange={this.handleChange("passwordFirst")} invalid={this.state.invalidForm}/>
                        <FormFeedback>Passwörter müssen mind. 8 Zeichen lang und identisch sein.</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Wiederholen</Label>
                        <Input placeholder="mind. 8 Zeichen" type="password" onChange={this.handleChange("passwordSecond")} invalid={this.state.invalidForm}/>
                        <FormFeedback>Passwörter müssen mind. 8 Zeichen lang und identisch sein.</FormFeedback>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    renderSuccess() {
        return(
            <div>
                <p className="text-success">Sie haben Ihr Password erfolgreich geändert!</p>
            </div>
        )
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handlePasswordChange = () => {
        if(this.state.passwordFirst.length >= 8 && this.state.passwordFirst === this.state.passwordSecond) {
            this.setState({
                invalidForm: false
            });
            this.changePassword(this.state.passwordFirst);
        } else {
            this.setState({
                invalidForm: true
            });
        }
    }

    close = () => {
        this.setState({
            passwordChanged: false
        });
        this.props.close();
    }

    async changePassword (newPass) {
        let {status, json} = await API.changePassword(newPass);
        if(status === 200) {
            this.setState({
                passwordChanged: true
            });
        } else {
            this.setState({
                invalidForm: true
            });
        }
    }
}

export default ChangePassword;