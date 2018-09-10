import React, {Component} from 'react';
import filesize from "filesize/lib/filesize.es6";
import {Input} from 'reactstrap';
import API from '../../API';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSave, faTrashAlt, faBan} from "@fortawesome/free-solid-svg-icons";

class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            filename: this.props.data.filename,
            info: this.props.data.info,
            viewedAt: this.props.data.viewedAt
        }
    }

    render() {
        let file = this.props.data;

        let localeOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        let fDate = new Date(Date.parse(file.date));
        let fViewDate = new Date(Date.parse(this.state.viewedAt));

        if(this.state.edit) {
            return (
                <tr>
                    <td>{file.id}</td>
                    <td><Input type="text" value={this.state.filename} onChange={this.handleChange("filename")}/></td>
                    <td><Input type="text" value={this.state.info} onChange={this.handleChange("info")}/></td>
                    <td>{this.translateMime(file.mime)}</td>
                    <td>{filesize(file.size)}</td>
                    <td><Input type="date" value={this.state.viewedAt} onChange={this.handleChange("viewedAt")}/></td>
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
                    <td>{this.state.filename}</td>
                    <td>{this.state.info}</td>
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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleEdit = () => {
        this.setState({
            edit: true
        });
    }

    handleSave = () => {
        this.updateFile();
    }

    handleAbort = () => {
        this.setState({
            edit: false,
            filename: this.props.data.filename,
            info: this.props.data.info,
            viewedAt: this.props.data.viewedAt
        });
    }

    handleRemove = () => {
        this.removeFile();
    }

    async updateFile() {
        let {status, json} = await API.changeFile(this.props.data.id, this.state.filename, this.state.info, this.state.viewedAt);
        if(status == 200 && json.hasOwnProperty("FMSuccess")) {
            this.setState({
                edit: false
            });
        } else {
            // todo: Error Handling
        }
    }

    async removeFile() {
        let {status, json} = await API.deleteFile(this.props.data.id);
        if(status == 200 && json.hasOwnProperty("FMSuccess")) {
            this.props.onRemove();
        } else {
            // todo: Error Handling
        }
    }

    translateMime(mime) {
        let mimeTypes = {
            'application/pdf': 'pdf'
        };
        return mimeTypes[mime];
    }
}

export default File;