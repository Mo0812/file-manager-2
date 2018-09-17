import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSave, faTrashAlt, faBan} from "@fortawesome/free-solid-svg-icons";
import {Input} from "reactstrap";

import API from '../../API';

Date.prototype.isValid = d => !isNaN(Date.parse(d));

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            doubleApprove: false,
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
            email: this.props.data.email,
            boomDate: this.props.data.boom_date
        }
    }

    render() {
        let user = this.props.data;

        let localeOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        let fBoomDate = new Date(Date.parse(this.state.boomDate));
        let fLastAction = new Date(Date.parse(user.last_action));

        if(this.state.edit) {
            return (
                <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td><Input type="text" value={this.state.firstname} onChange={this.handleChange("firstname")}/>{' '}<Input type="text" value={this.state.lastname} onChange={this.handleChange("lastname")}/></td>
                    <td><Input type="text" value={this.state.email} onChange={this.handleChange("email")}/></td>
                    <td className="center">
                        <Input type="select">
                            <option value="admin">Admin</option>
                            <option value="user">Teilnehmer</option>
                        </Input>
                    </td>
                    <td className="center">{fLastAction.isValid(fLastAction) ? fLastAction.toLocaleDateString(navigator.language, localeOptions) : "-"}</td>
                    <td className="center"><Input type="date" value={this.state.boomDate} onChange={this.handleChange("boomDate")}/></td>
                    <td>
                        <FontAwesomeIcon icon={faSave} onClick={this.handleSave}/>{' '}
                        <FontAwesomeIcon icon={faBan} onClick={this.handleAbort}/>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr onClick={this.handleTotalClick}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{this.state.firstname + " " + this.state.lastname}</td>
                    <td>{this.state.email}</td>
                    <td className="center">{user.rights}</td>
                    <td className="center">{fLastAction.isValid(fLastAction) ? fLastAction.toLocaleDateString(navigator.language, localeOptions) : "-"}</td>
                    <td className="center">{fBoomDate.isValid(fBoomDate) ? fBoomDate.toLocaleDateString(navigator.language, localeOptions) : "-"}</td>
                    <td className="center">
                        <FontAwesomeIcon icon={faPen} onClick={this.handleEdit}/>{' '}
                        {
                            this.state.doubleApprove ?
                                <Button color="danger" size="sm" onClick={this.handleRemove}>Löschen</Button> :
                                <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleRemove}/>
                        }
                    </td>
                </tr>
            );
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleEdit = () => {
        this.setState({
            edit: true
        });
    }

    handleSave = () => {
        this.updateUser();
    }

    handleAbort = () => {
        this.setState({
            edit: false,
        });
    }

    handleRemove = () => {
        if(this.state.doubleApprove) {
            this.removeUser();
        } else {
            this.setState({
                doubleApprove: true
            });
        }
    }

    handleTotalClick = () => {
        if(this.state.doubleApprove) {
            this.setState({
                doubleApprove: false
            });
        }
    }

    async updateUser() {
        let {status, json} = await API.changeUser(this.props.data.id, this.state.firstname, this.state.lastname, this.state.email, this.props.data.rights, this.state.boomDate);
        if(status == 200 && json.hasOwnProperty("FMSuccess")) {
            this.setState({
                edit: false
            });
        } else {
            // todo: Error Handling
        }
    }

    async removeUser() {
        let {status, json} = await API.deleteUser(this.props.data.id);
        if(status == 200 && json.hasOwnProperty("FMSuccess")) {
            this.props.onRemove();
        } else {
            // todo: Error Handling
        }
    }
}

export default User;