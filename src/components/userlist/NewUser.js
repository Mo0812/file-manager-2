import React, {Component} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSave, faTrashAlt, faBan} from "@fortawesome/free-solid-svg-icons";
import {Input} from "reactstrap";

import API from '../../API';

class NewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            boomDate: ''
        }
    }

    render() {

        return (
            <tr>
                <td></td>
                <td></td>
                <td><Input type="text" value={this.state.firstname} onChange={this.handleChange("firstname")}/>{' '}<Input type="text" value={this.state.lastname} onChange={this.handleChange("lastname")}/></td>
                <td><Input type="text" value={this.state.email} onChange={this.handleChange("email")}/></td>
                <td className="center">
                    <Input type="select">
                        <option value="admin">Admin</option>
                        <option value="user">Teilnehmer</option>
                    </Input>
                </td>
                <td className="center">-</td>
                <td className="center"><Input type="date" value={this.state.boomDate} onChange={this.handleChange("boomDate")}/></td>
                <td>
                    <FontAwesomeIcon icon={faSave} onClick={this.handleSave}/>
                    <FontAwesomeIcon icon={faBan} onClick={this.handleAbort}/>
                </td>
            </tr>
        );
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSave = () => {
        this.createUser();
    }

    handleAbort = () => {
        this.props.onAbort();
    }

    async createUser() {
        let {status, json} = await API.createUser(this.state.firstname, this.state.lastname, this.state.email, 'admin', this.state.boomDate);
        if(status == 200 && json.hasOwnProperty("FMSuccess")) {
            this.props.onCreation();
        } else {
            // todo: Error Handling
        }
    }
}

export default NewUser;