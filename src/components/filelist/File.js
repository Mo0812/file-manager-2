import React, {Component} from 'react';
import filesize from "filesize/lib/filesize";
import {Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import API from '../../API';


Date.prototype.isValid = d => !isNaN(Date.parse(d));

class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            doubleApprove: false,
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

        if(this.state.edit && API.checkRight("admin")) {
            return (
                <tr>
                    <td>{file.id}</td>
                    <td><Input type="text" value={this.state.filename} onChange={this.handleChange("filename")}/></td>
                    <td><Input type="text" value={this.state.info} onChange={this.handleChange("info")}/></td>
                    <td className="center">{this.translateMime(file.mime)}</td>
                    <td className="center">{filesize(file.size)}</td>
                    <td className="center"><Input type="date" value={this.state.viewedAt} onChange={this.handleChange("viewedAt")}/></td>
                    <td className="center">{fDate.toLocaleDateString(navigator.language, localeOptions)}</td>
                    <td className="center">
                        {
                            this.renderButtonsOnEdit()
                        }
                    </td>
                </tr>
            );
        } else if(this.props.preview) {
            return (
                <tr className="disabled">
                    <td></td>
                    <td>{this.state.filename}</td>
                    <td></td>
                    <td className="center">{this.translateMime(file.mime)}</td>
                    <td className="center">{filesize(file.size)}</td>
                    <td className="center">-</td>
                    <td className="center">-</td>
                    <td className="center">
                    </td>
                </tr>
            )
        } else {
            return (
                <tr onClick={this.handleTotalClick}>
                    <td>{file.id}</td>
                    <td><a href={file.data} download={file.filename} target="_blank">{this.state.filename}</a></td>
                    <td>{this.state.info}</td>
                    <td className="center">{this.translateMime(file.mime)}</td>
                    <td className="center">{filesize(file.size)}</td>
                    <td className="center">{fViewDate.isValid(fViewDate) ? fViewDate.toLocaleDateString(navigator.language, localeOptions) : "-"}</td>
                    <td className="center">{fDate.toLocaleDateString(navigator.language, localeOptions)}</td>
                    <td className="center">
                        {
                            !this.state.doubleApprove ?
                                this.renderButtonsDefault(file) :
                                this.renderButtonsOnRemove()
                        }
                    </td>
                </tr>
            );
        }
    }

    renderButtonsDefault(file) {
        return(
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} size="sm">
                <DropdownToggle caret>
                    Actions
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem><a href={file.data} download target="_blank">Download</a></DropdownItem>
                    <DropdownItem onClick={this.handlePreview}>Vorschau</DropdownItem>
                    {
                        API.checkRight("admin") ?
                            (
                                <DropdownItem onClick={this.handleEdit}>Bearbeiten</DropdownItem>
                            ) : ""
                    }
                    {
                        API.checkRight("admin") ?
                            (
                                <DropdownItem onClick={this.handleRemove}>Löschen</DropdownItem>
                            ) : ""
                    }
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    renderButtonsOnRemove() {
        return(
            <Button color="danger" size="sm" onClick={this.handleRemove}>Löschen</Button>
        );
    }

    renderButtonsOnEdit() {
        return(
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} size="sm">
                <DropdownToggle caret>
                    Actions
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.handleSave}>Speichern</DropdownItem>
                    <DropdownItem onClick={this.handleAbort}>Abbrechen</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleDownload = () => {

    }

    handlePreview = () => {
        this.props.onFilePreview(this.props.data);
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
        if(this.state.doubleApprove) {
            this.removeFile();
        } else {
            this.setState({
                doubleApprove: true
            });
        }
    }

    handleTotalClick = () => {
        if(this.state.doubleApprove) {
            this.setState({
                doubleApprove: false
            });
        }
    }

    async updateFile() {
        let {status, json} = await API.changeFile(this.props.data.id, this.state.filename, this.state.info, this.state.viewedAt);
        if(status === 200 && json.hasOwnProperty("FMSuccess")) {
            this.setState({
                edit: false
            });
        } else {
            // todo: Error Handling
        }
    }

    async removeFile() {
        let {status, json} = await API.deleteFile(this.props.data.id);
        if(status === 200 && json.hasOwnProperty("FMSuccess")) {
            this.props.onRemove();
            this.props.onAlert("danger", "Datei gelöscht");
        } else {
            // todo: Error Handling
        }
    }

    translateMime(mime) {
        switch(mime) {
            case 'application/pdf':
                return 'pdf';
            case 'image/jpg':
            case 'image/jpeg':
                return 'jpg';
            default:
                return mime;
        }
    }
}

export default File;