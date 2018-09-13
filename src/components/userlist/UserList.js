import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

import API from '../../API';
import User from './User';

import './UserList.css';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        return (
            <section className="fm-userlist">
                <h2><FormattedMessage id="userlist.title" /></h2>
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
                    <th><FormattedMessage id="userlist.username"/></th>
                    <th><FormattedMessage id="userlist.fullname"/></th>
                    <th><FormattedMessage id="userlist.email"/></th>
                    <th className="w-25 center"><FormattedMessage id="userlist.logged_in"/></th>
                    <th className="w-25 center"><FormattedMessage id="userlist.rights"/></th>
                    <th className="center"><FormattedMessage id="userlist.last_action"/></th>
                    <th className="center"><FormattedMessage id="userlist.expires"/></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    user.map((singleUser) => {
                        console.log(singleUser);
                        return <User key={singleUser.id} data={singleUser} />
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