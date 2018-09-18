import React, {Component} from 'react';
import {Table, Button, Alert} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Dropzone from 'react-dropzone';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

import API from '../../API';

import File from './File';
import FilePreview from "./FilePreview";

import './FileList.css';

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            files: [],
            dropzoneActive: false,
            uploadFiles: [],
            filePreview: false,
            filePreviewObject: null,
            alert: null
        }
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        let files = this.state.files;

        return(
            <section className="fm-filelist">
                <Dropzone className="fm-total-drop" onDrop={this.onDrop} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} disableClick>
                    {this.state.dropzoneActive && <div className="fm-drop-overlay"><FontAwesomeIcon icon={faDownload} className="fm-drop-icon"/></div>}
                    <h2><FormattedMessage id="filelist.title" /></h2>
                    {
                        this.state.alert !== null ?
                            <Alert color={this.state.alert.color}>{this.state.alert.text}</Alert> :
                            null
                    }
                    {
                        !this.state.isLoading ?
                            this.renderFilelist(files) :
                            this.renderLoadingScreen()
                    }
                </Dropzone>
                <FilePreview open={this.state.filePreview} close={this.closeFilePreview} data={this.state.filePreviewObject} className="fm-file-preview"/>
            </section>
        );
    }

    renderFilelist(files) {
        if(files.length > 0) {
            return (
                <Table striped responsive>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th className="w-25"><FormattedMessage id="filelist.filename"/></th>
                        <th className="w-25"><FormattedMessage id="filelist.info"/></th>
                        <th className="center"><FormattedMessage id="filelist.mime"/></th>
                        <th className="center"><FormattedMessage id="filelist.size"/></th>
                        <th className="w-25 center"><FormattedMessage id="filelist.viewedAt"/></th>
                        <th className="w-25 center"><FormattedMessage id="filelist.date"/></th>
                        <th className="functions center"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.uploadFiles.map((file) => {
                            return <File key={file.name} data={{
                                filename: file.name,
                                size: file.size,
                                mime: file.type
                            }} preview={true}/>
                        })
                    }
                    {
                        files.map((file) => {
                            return <File key={file.id} data={file} onRemove={this.refreshFileList}
                                         onFilePreview={this.openFilePreview} onAlert={(color, message) => this.onAlert(color, message)}/>
                        })
                    }
                    </tbody>
                </Table>
            );
        } else {
            return (
                <div className="info-box">
                    <h3 className="">Es wurden momentan leider keine Dateien für Sie freigeschaltet.</h3>
                    <p>Durch aktualisieren des Browsers oder Klicken auf den Button können Sie die Daten erneut anfordern.</p>
                    <Button color="secondary" onClick={this.refreshFileList}>Aktualisieren</Button>
                </div>
            );
        }
    }

    renderLoadingScreen() {
        return(
            <div className="info-box">
                <h3>Files get loaded</h3>
            </div>
        );
    }

    /*
    DROPZONE
     */

    onDragEnter = () => {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave = () => {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop = (files) => {
        if(API.checkRight("admin")) {
            this.setState({
                dropzoneActive: false,
                uploadFiles: files
            });
            this.uploadFiles(files);
        } else {
            this.setState({
                dropzoneActive: false
            });
        }
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

    refreshFileList = () => {
        this.fetchData();
    }

    async fetchData() {
        let {status, json} = await API.files();
        if(status === 200) {
            this.setState({
                files: json,
                isLoading: false
            });
        } else {
            // todo: ERROR HANDLING
            this.setState({
                files: [],
                isLoading: false
            });
        }
    }

    async uploadFiles(files) {
        let {status, json} = await API.uploadFile(files);
        if(status === 200) {
            this.setState({
                uploadFiles: []
            })
            this.refreshFileList();
        } else {
            // todo: Error Handling
        }
    }

    /*
    FILE PREVIEW
     */

    openFilePreview = (data) => {
        this.setState({
            filePreview: true,
            filePreviewObject: data
        });
    }

    closeFilePreview = () => {
        this.setState({
            filePreview: false
        });
    }
}

export default FileList;