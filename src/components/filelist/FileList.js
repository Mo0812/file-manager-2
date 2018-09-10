import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Dropzone from 'react-dropzone';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

import API from '../../API';

import File from './File';

import './FileList.css';

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            uploadFiles: [],
            dropzoneActive: false
        }
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        console.log(this.state.files);
        let files = this.state.files;

        return(
            <section className="fm-filelist">
                <Dropzone className="fm-total-drop" onDrop={this.onDrop} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} disableClick>
                    {this.state.dropzoneActive && <div className="fm-drop-overlay"><FontAwesomeIcon icon={faDownload} className="fm-drop-icon"/></div>}
                    <h2><FormattedMessage id="filelist.title" /></h2>
                    {
                        files !== null ?
                            this.renderFilelist(files) :
                            this.renderLoadingScreen()
                    }
                </Dropzone>
            </section>
        );
    }

    renderFilelist(files) {
        return(
            <Table striped responsive>
                <thead>
                <tr>
                    <th>id</th>
                    <th className="w-25"><FormattedMessage id="filelist.filename"/></th>
                    <th className="w-25"><FormattedMessage id="filelist.info" /></th>
                    <th><FormattedMessage id="filelist.mime" /></th>
                    <th><FormattedMessage id="filelist.size" /></th>
                    <th className="w-25"><FormattedMessage id="filelist.viewedAt" /></th>
                    <th className="w-25"><FormattedMessage id="filelist.date" /></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    files.map((file) => {
                        return <File key={file.id} data={file} onRemove={this.refreshFileList}/>
                    })
                }
                {
                    this.state.uploadFiles.map((file) => {
                        return(
                            <div>{file.name} - {file.size} bytes</div>
                        );
                    })
                }
                </tbody>
            </Table>
        );
    }

    renderLoadingScreen() {
        return(
            <div>
                Files get loaded
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
        this.fetchData();
    }

    async fetchData() {
        let {status, json} = await API.files();
        if(status === 200) {
            this.setState({
                files: json
            });
        } else {
            // todo: ERROR HANDLING
        }
    }
}

export default FileList;