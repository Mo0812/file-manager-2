import React, {Component} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSave, faTrashAlt, faBan, faDotCircle} from "@fortawesome/free-solid-svg-icons";

Date.prototype.isValid = d => !isNaN(Date.parse(d));

class User extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let user = this.props.data;

        let localeOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        let fBoomDate = new Date(Date.parse(user.boom_date));
        let fLastAction = new Date(Date.parse(user.last_action));

        console.log(fBoomDate.toLocaleDateString(navigator.language, localeOptions));

        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstname + " " + user.lastname}</td>
                <td>{user.email}</td>
                <td className="center">{
                    user.logged_in == 1 ?
                        <FontAwesomeIcon icon={faDotCircle} className="text-success" /> : <FontAwesomeIcon icon={faDotCircle} className="text-danger" />
                }</td>
                <td className="center">{user.rights}</td>
                <td className="center">{fBoomDate.isValid(fBoomDate) ? fBoomDate.toLocaleDateString(navigator.language, localeOptions) :  "-"}</td>
                <td className="center">{fLastAction.isValid(fLastAction) ? fLastAction.toLocaleDateString(navigator.language, localeOptions) : "-"}</td>
                <td>
                    <FontAwesomeIcon icon={faPen} onClick={this.handleEdit}/>
                    <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleRemove}/>
                </td>
            </tr>
        );
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
        this.updateFile();
    }

    handleAbort = () => {
        this.setState({
            edit: false,
        });
    }

    handleRemove = () => {
        this.removeFile();
    }
}

export default User;