import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null

        }
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        console.log(this.state.files);
        let files = this.state.files;

        return(
            <section>
                <h2>Filelist</h2>
                {
                    files !== null ?
                        this.renderFilelist(files) :
                        this.renderLoadingScreen()
                }
            </section>
        );
    }

    renderFilelist(files) {
        return(
            <Table striped>
                <thead>
                <tr>
                    <th>id</th>
                    <th><FormattedMessage id="filelist.filename"/></th>
                    <th>info</th>
                    <th>mime</th>
                    <th>size</th>
                    <th>published at</th>
                    <th>date</th>
                </tr>
                </thead>
                <tbody>
                {
                    files.map((file) => {
                        return(
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>{file.filename}</td>
                                <td>{file.info}</td>
                                <td>{file.mime}</td>
                                <td>{file.size}</td>
                                <td>{file.viewedAt}</td>
                                <td>{file.date}</td>

                            </tr>
                        )
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

    async fetchData() {
        await this.sleep(2000);
        let data = [
            {
                "id": "774",
                "filename": "1 Abend Seerecht.pdf",
                "info": "",
                "data": "",
                "mime": "application/pdf",
                "date": "2016-12-13",
                "size": "79318",
                "usergroup": "user",
                "viewedAt": "2016-12-12"
            },
            {
                "id": "773",
                "filename": "1-Abend-SSS-19-Termine.pdf",
                "info": "",
                "data": "",
                "mime": "application/pdf",
                "date": "2016-12-13",
                "size": "53548",
                "usergroup": "user",
                "viewedAt": "2016-12-12"
            },
            {
                "id": "772",
                "filename": "1-Abend-SSS-18-Literaturliste.pdf",
                "info": "",
                "data": "",
                "mime": "application/pdf",
                "date": "2016-12-13",
                "size": "60262",
                "usergroup": "user",
                "viewedAt": "2016-12-12"
            },
            {
                "id": "771",
                "filename": "1-Abend-SSS-4-Teil-A-KVR-Inhalt-der-Paragraphen-und-Definitionen.pdf",
                "info": "",
                "data": "",
                "mime": "application/pdf",
                "date": "2016-12-13",
                "size": "78927",
                "usergroup": "user",
                "viewedAt": "2016-12-12"
            }
        ];
        this.setState({
            files: data
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default FileList;