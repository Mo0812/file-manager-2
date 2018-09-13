import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class FilePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let file = this.props.data;
        return (
            <Modal isOpen={this.props.open} toggle={this.close} className={this.props.className}>
                <ModalHeader toggle={this.close}>Modal title</ModalHeader>
                <ModalBody>
                    {
                        file !== null ? this.insertObject() : ""
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.close}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.close}>Cancel</Button>
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