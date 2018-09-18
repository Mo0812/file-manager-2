class API {

    static getUsername() {
        return localStorage.getItem("username") || "";
    }

    static __getUser() {
        let username = localStorage.getItem("username") || "";
        let password = localStorage.getItem("password") || "";

        return {username, password}
    }

    static async auth() {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/auth', {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        });
        let status = await response.status;
        let json = await response.json();
        return {status: status, json: json};
    }

    static async files() {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/files', {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        });
        let status = await response.status;
        let json = await response.json();
        return {status: status, json: json};
    }

    static async changeFile(id, filename, info, viewedAt) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/file/' + id, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "filename": filename,
                "info": info,
                "viewedAt": viewedAt
            })
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json};
    }

    static async deleteFile(id) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/file/' + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
            }
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json};
    }

    static async user() {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/user', {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        });
        let status = await response.status;
        let json = await response.json();
        return {status: status, json: json};
    }

    static async createUser(firstname, lastname, email, rights, boomDate) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/user', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "rights": rights,
                "boom_date": boomDate
            })
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json};
    }

    static async changeUser(id, firstname, lastname, email, rights, boomDate) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/user/' + id, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "rights": rights,
                "boom_date": boomDate
            })
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json};
    }

    static async deleteUser(id) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/user/' + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
            }
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json};
    }

    static async changePassword(newPass) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/password/change', {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "new_pass": newPass
            })
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json}
    }

    static async resetPassword(id) {
        let {username, password} = this.__getUser();

        let response = await fetch('https://moritzkanzler.de/filemanager-rest/password/reset/'  + id, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
            }
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json}
    }

    static async forgotPasswort(email) {
        let response = await fetch('https://moritzkanzler.de/filemanager-rest/password/forgot', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email
            })
        });
        let status = await response.status;
        let json = await response.json();
        return {status, json}
    }
}

export default API;