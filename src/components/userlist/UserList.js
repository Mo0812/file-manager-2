import React, {Component} from 'react';
import {Alert, Table, Button} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import API from '../../API';
import User from './User';
import NewUser from './NewUser';

import './UserList.css';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            new: false,
            alert: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        return (
            <section className="fm-userlist">
                <h2><FormattedMessage id="userlist.title" />{' '}<Button onClick={this.newUser} color="secondary"><FontAwesomeIcon icon={faPlus}/></Button></h2>
                {
                    this.state.alert !== null ?
                        <Alert color={this.state.alert.color}>{this.state.alert.text}</Alert> :
                        null
                }
                {
                    this.state.user.length > 0 ?
                        this.renderUserlist(this.state.user) :
                        this.renderLoadingScreen()
                }
            </section>
        );
    }

    renderUserlist(user) {
        return(
            <Table striped responsive>
                <thead>
                <tr>
                    <th>id</th>
                    <th className="w-25"><FormattedMessage id="userlist.username"/></th>
                    <th className="w-25"><FormattedMessage id="userlist.fullname"/></th>
                    <th className="w-25"><FormattedMessage id="userlist.email"/></th>
                    <th className="w-25 center"><FormattedMessage id="userlist.rights"/></th>
                    <th className="center"><FormattedMessage id="userlist.last_action"/></th>
                    <th className="center"><FormattedMessage id="userlist.expires"/></th>
                    <th className="functions center"></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.new ? <NewUser onCreation={this.addUser} onAbort={this.abortUser} onAlert={(color, message) => this.onAlert(color, message)}/> : null
                }
                {
                    user.map((singleUser) => {
                        return <User key={singleUser.id} data={singleUser} onRemove={this.refreshList} onAlert={(color, message) => this.onAlert(color, message)}/>
                    })
                }
                </tbody>
            </Table>
        );
    }

    renderLoadingScreen() {
        return(
            <div>
                User get loaded
            </div>
        );
    }

    /*
    NEW USER
     */

    newUser = () => {
        this.setState({
            new: true
        })
    }

    addUser = () => {
        this.setState({
            new: false
        });
        this.refreshList();
    }

    abortUser = () => {
        this.setState({
            new: false
        });
    }

    /*
    ALERT
     */

    onAlert = (color, message) => {
        this.setState({
            alert: {
                color: color,
                text: message
            }
        });
        setTimeout(() => {
            this.setState({
                alert: null
            })
        }, 5000);
    }

    /*
    DATA SOURCE
     */

    refreshList = () => {
        this.fetchData();
    }

    async fetchData() {
        let {status, json} = await API.user();
        if(status === 200) {
            this.setState({
                user: json
            });
        } else {
            // todo: ERROR HANDLING
        }
    }
}

export default UserList;