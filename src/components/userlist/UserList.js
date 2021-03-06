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
            isLoading: true,
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
                <h2>
                    <FormattedMessage id="userlist.title" />
                    {' '}
                    {
                        API.checkRight("admin") ?
                            <Button onClick={this.newUser} color="secondary"><FontAwesomeIcon icon={faPlus}/></Button> :
                            null
                    }
                </h2>
                {
                    this.state.alert !== null ?
                        <Alert color={this.state.alert.color}>{this.state.alert.text}</Alert> :
                        null
                }
                {
                    !this.state.isLoading ?
                        this.renderUserlist(this.state.user) :
                        this.renderLoadingScreen()
                }
            </section>
        );
    }

    renderUserlist(user) {
        if(user.length > 0) {
            return (
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
                        this.state.new ? <NewUser onCreation={this.addUser} onAbort={this.abortUser}
                                                  onAlert={(color, message) => this.onAlert(color, message)}/> : null
                    }
                    {
                        user.map((singleUser) => {
                            return <User key={singleUser.id} data={singleUser} onRemove={this.refreshList}
                                         onAlert={(color, message) => this.onAlert(color, message)}/>
                        })
                    }
                    </tbody>
                </Table>
            );
        } else {
            return (
                <div className="info-box">
                    <h3 className="">Es wurden momentan leider keine Benutzer gefunden.</h3>
                    <p>Durch aktualisieren des Browsers oder Klicken auf den Button können Sie die Daten erneut anfordern.</p>
                    <Button color="secondary" onClick={this.refreshList}>Aktualisieren</Button>
                </div>
            );
        }
    }

    renderLoadingScreen() {
        return(
            <div className="info-box">
                <h3>User get loaded</h3>
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
                user: json,
                isLoading: false
            });
        } else {
            this.setState({
                user: [],
                isLoading: false
            });
        }
    }
}

export default UserList;