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
}

export default API;