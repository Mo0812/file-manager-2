import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import './FilePreview.css';

class FilePreview extends React.Component {
    render() {
        let file = this.props.data;
        return (
            <Modal isOpen={this.props.open} toggle={this.close} className={this.props.className}>
                <ModalHeader toggle={this.close}><FormattedMessage id="filepreview.title"/></ModalHeader>
                <ModalBody>
                    {
                        file !== null ? this.insertObject() : ""
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.close}><FormattedMessage id="filepreview.cancel"/></Button>
                </ModalFooter>
            </Modal>
        );
    }

    insertObject() {
        return (<object data={this.props.data.data}></object>);
    }

    close = () => {
        this.props.close();
    }

}

export default FilePreview;