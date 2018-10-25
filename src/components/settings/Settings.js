import React, {Component} from 'react';
import {} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

import API from '../../API';

import './Settings.css';

class Settings extends Component {
    render() {
        return (
            <section className="fm-settings">
                <h2><FormattedMessage id="settings.title" /></h2>
            </section>
        );
    }

    renderSettings() {
        return(
            <div />
        );
    }

    renderLoadingScreen() {
        return(
            <div className="info-box">
                <h3>Settings get loaded</h3>
            </div>
        );
    }
}

export default Settings;