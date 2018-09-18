import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
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
            uploadFiles: [],
            dropzoneActive: false,
            filePreview: false,
            filePreviewObject: null
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
                        <th><FormattedMessage id="filelist.mime"/></th>
                        <th><FormattedMessage id="filelist.size"/></th>
                        <th className="w-25"><FormattedMessage id="filelist.viewedAt"/></th>
                        <th className="w-25"><FormattedMessage id="filelist.date"/></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        files.map((file) => {
                            return <File key={file.id} data={file} onRemove={this.refreshFileList}
                                         onFilePreview={this.openFilePreview}/>
                        })
                    }
                    {
                        this.state.uploadFiles.map((file) => {
                            return (
                                <div>{file.name} - {file.size} bytes</div>
                            );
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
        this.setState({
            uploadFiles: files,
            dropzoneActive: false
        });
    }

    /*
    DATA SOURCE
     */

    refreshFileList = () => {
        this.setState({
            isLoading: true
        });
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