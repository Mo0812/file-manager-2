import React, {Component} from 'react';
import filesize from "filesize/lib/filesize.es6";
import {Input} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSave, faTrashAlt, faBan} from "@fortawesome/free-solid-svg-icons";

class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }


    render() {
        let file = this.props.data;

        let localeOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        let fDate = new Date(Date.parse(file.date));
        let fViewDate = new Date(Date.parse(file.viewedAt));

        if(this.state.edit) {
            return (
                <tr>
                    <td>{file.id}</td>
                    <td><Input type="text" value={file.filename}/></td>
                    <td><Input type="text" value={file.info} /></td>
                    <td>{this.translateMime(file.mime)}</td>
                    <td>{filesize(file.size)}</td>
                    <td><Input type="date" value={file.viewedAt} /></td>
                    <td>{fDate.toLocaleDateString(navigator.language, localeOptions)}</td>
                    <td>
                        <FontAwesomeIcon icon={faSave} onClick={this.handleSave}/>
                        <FontAwesomeIcon icon={faBan} onClick={this.handleAbort}/>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{file.id}</td>
                    <td>{file.filename}</td>
                    <td>{file.info}</td>
                    <td>{this.translateMime(file.mime)}</td>
                    <td>{filesize(file.size)}</td>
                    <td>{fViewDate.toLocaleDateString(navigator.language, localeOptions)}</td>
                    <td>{fDate.toLocaleDateString(navigator.language, localeOptions)}</td>
                    <td>
                        <FontAwesomeIcon icon={faPen} onClick={this.handleEdit}/>
                        <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleRemove}/>
                    </td>
                </tr>
            );
        }
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleSave = () => {
        console.log("SAVE");
    }

    handleAbort = () => {
        console.log("ABORT");
        this.setState({
            edit: false
        });
    }

    handleRemove = () => {
        console.log("REMOVE")
    }

    translateMime(mime) {
        let mimeTypes = {
            'application/pdf': 'pdf'
        };
        return mimeTypes[mime];
    }
}

export default File;