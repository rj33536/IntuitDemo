const USER_SERVICE_URL = "http://127.0.0.1:8000/users/";

export function register(username) {

    return new Promise((resolve, reject) => {
        fetch(USER_SERVICE_URL + "register/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
            })
        }).then(response => {
            resolve(response.json());
        }).catch(e => {
            reject(e);
        })
    })
}

export function updateEvents(username, eventIds) {
    return fetch(USER_SERVICE_URL + "update-events/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            events: eventIds
        })
    });
}

export function login(username) {
    return new Promise((resolve, reject) => {
        fetch(USER_SERVICE_URL + "login?username=" + username, {
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => {
            resolve(response.json());
        }).catch(e => {
            reject(e);
        })
    })

}